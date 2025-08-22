import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { DeepPartial, In, Repository } from 'typeorm';
import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { ShipementsTable } from 'src/entities/shipments.entity';
import { last } from 'rxjs';
import { BankDetails } from 'src/entities/bank-details.entity';
import { Destinations } from 'src/entities/destination.entity';
import { Clients } from 'src/entities/client/clients';
import { CreateInvoiceDTO } from './dto/createInvoice.dto';
import { AddStyleDto } from './dto/add-new-style.dto';
import { UpdateStyleDto } from './dto/update-orderline.dto';

@Injectable()
export class ShipmentInvoiceService {
    constructor(

        @InjectRepository(Orderheads)
        private readonly orderheadRepo: Repository<Orderheads>,

        @InjectRepository(Orderline)
        private readonly orderLineRepo: Repository<Orderline>,
        @InjectRepository(Shipments)
        private readonly shipmentRepo: Repository<Shipments>,

        @InjectRepository(ShipementsTable)
        private readonly shipmentTableRepo: Repository<ShipementsTable>,

        @InjectRepository(BankDetails)
        private readonly bankDetailsRepo: Repository<BankDetails>,

        @InjectRepository(Destinations)
        private readonly destinationRepo: Repository<Destinations>,

        @InjectRepository(Clients)
        private readonly clientRepo: Repository<Clients>
    ) { }

    async findAllOrdersNotShipped(query: QueryParamsDto, req) {
        const qb = this.orderheadRepo.createQueryBuilder('oh');
        //qb.leftJoinAndSelect('oh.shipments', 'sh');
        qb.innerJoinAndSelect('oh.orderline', 'ol');

        qb.leftJoinAndSelect('oh.clients', 'c', 'c.active = :active', {
            active: 1
        });
        qb.leftJoinAndSelect('c.country', 'count', 'count.active = :active', {
            active: 1
        });
        qb.leftJoinAndSelect('oh.merchandiser', 'merch');
        /*qb.leftJoinAndSelect('oh.merchandiser', 'merch', 'merch.active = :active', {
            active: 1
        });*/
        qb.innerJoinAndSelect('c.contacts', 'ctc', 'ctc.id = oh.client_name');
        qb.innerJoinAndSelect('c.paymentterm', 'ptt', 'ptt.active = :active ', {
            active: 1
        });
        qb.andWhere(`(oh.orderstatus != "Shipped") AND (oh.orderstatus != "Canceled") `);
        //qb.andWhere(`(ol.quantity_to_be_shipped IS NOT NULL) `);
        //qb.andWhere(`(oh.invoice_code IS NOT NULL) `);
        //qb.andWhere(`(sh.orderhead_id IS NULL) `);

        if (query.search) {
            qb.andWhere('oh.code LIKE :global_search', {
                global_search: `%${query.search}%`,
            });
        }
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const offset = (page - 1) * limit;

        qb.skip(offset);
        qb.take(limit);
        //qb.limit(100);
        qb.orderBy('oh.code', 'ASC')
        const [orderheads, total] = await qb.getManyAndCount();

        //sum prices to and make the average price for each orders
        return orderheads.map((oh) => {
            const prices = oh.orderline?.map((ol) => ol.price) || [];
            const totalprice = prices.reduce((acc, val) => acc + Number(val), 0);
            const average_price = prices.length ? totalprice / prices.length : 0;

            return {
                ...oh,
                totalprice,
                average_price,
            };
        });

    }

    async findAllOrderlineByOrder(id: number) {
        const orderhead = await this.orderheadRepo.findOne({ where: { id } });
        if (!orderhead) {
            throw new NotFoundException(`Orderhead with ID ${id} not found`);
        }
        const qb = this.orderLineRepo.createQueryBuilder('ol');
        qb.innerJoinAndSelect('ol.orderhead', 'oh');
        qb.andWhere(`${orderhead.id} = ol.orderhead_id`);
        //qb.limit(40)
        return qb.getMany();
    }

    async findAllOrderheadByOrderline(id: number) {
        const orderhead = await this.orderheadRepo.findOne({ where: { id } });
        if (!orderhead) {
            throw new NotFoundException(`Orderhead with ID ${id} not found`);
        }
        const qb = this.orderheadRepo.createQueryBuilder('oh');
        qb.innerJoinAndSelect('oh.orderline', 'ol');
        qb.andWhere(`${orderhead.id} = ol.orderhead_id`);
        //qb.limit(40)
        return qb.getMany();
    }

    async findBankLinkedOnOrderCurrency(id: number): Promise<BankDetails[]> {
        const orderhead = await this.orderheadRepo
            .createQueryBuilder('oh')
            .leftJoinAndSelect('oh.currencies', 'currency')
            .where('oh.id = :id', { id })
            .andWhere('currency.active = true')
            .getOne();

        if (!orderhead) {
            throw new NotFoundException(`Orderhead with ID ${id} or its active currency not found`);
        }

        const bankDetails = await this.bankDetailsRepo.find({
            where: {
                currency: orderhead.currency_id,
            },
        });

        return bankDetails;
    }

    async findClientDestination(id: number): Promise<Destinations[]> {
        const destinations = await this.destinationRepo.find({
            where: {
                client: { id },
            },
            relations: ['country'],
            select: ['id', 'name', 'address1', 'address2', 'address3', 'address4', 'postcode', 'city', 'county', 'country'],
        });

        if (!destinations || destinations.length === 0) {
            throw new NotFoundException(`No destinations found for client with ID ${id}`);
        }

        return destinations;
    }

    async findInvoiceWithRelations(invoiceId: number): Promise<Shipments> {
        const invoice = await this.shipmentRepo.findOne({
            where: { id: invoiceId },
            relations: ['client', 'bank_details', 'destination'],
        });

        if (!invoice) {
            throw new NotFoundException(`Invoice with ID ${invoiceId} not found`);
        }

        return invoice;
    }

    async findCommonClient(orderheadIds: number[]): Promise<Clients> {
        if (!Array.isArray(orderheadIds) || orderheadIds.length === 0) {
            throw new BadRequestException('orderheadIds must be a non-empty array');
        }

        const orderheads = await this.orderheadRepo.find({
            where: { id: In(orderheadIds) },
            relations: ['clients']
        });
        if (!orderheads.length) {
            throw new NotFoundException(`No orderheads founds for IDs ${orderheadIds.join(', ')}`);
        }
        const firstClient = orderheads[0].clients;

        const allSameClient = orderheads.every(
            (oh) => oh.clients.id === firstClient.id,
        );
        if (!allSameClient)
            throw new NotFoundException(`Not the same client`);
        return firstClient
    }

    //create shipmnent
    async create(createDto: CreateShipmentDTO) {
        const {
            //shipment_code,
            orderlines,
        } = createDto;

        const orderheads: Orderheads[] = [];
        const shipmentTable: ShipementsTable[] = [];

        for (const ol of orderlines) {
            const orderline = await this.orderLineRepo.findOne({
                where: { id: ol.id },
                relations: ['orderhead'],
            });

            if (!orderline) {
                throw new NotFoundException(`OrderLine with ID ${ol.id} not found`);
            }

            // update
            orderline.hs_code = ol.hs_code;
            orderline.quantity_shipped += ol.quantity_to_ship;
            orderline.status = 'Partly Shipped';

            const orderhead = orderline.orderhead;
            if (!orderhead) {
                throw new NotFoundException(`OrderHead not found for OrderLine ID ${ol.id}`);
            }

            //check to avoid duplicate orderhead
            if (!orderheads.some(o => o.id === orderhead.id)) {
                orderheads.push(orderhead);
            }

            const tableRow = this.shipmentTableRepo.create({
                //shipment_code: '',
                orderhead_id: orderhead.id,
                orderline_id: orderline.id,
                shipped: ol.quantity_to_ship,
                created_at: new Date(),
                updated_at: new Date(),
            });

            shipmentTable.push(tableRow);
        }
        //console.log('shipmentTable to save:', shipmentTable);
        //await this.shipmentTableRepo.save(shipmentTable);

        const generatedShipmentCode = await this.generateShipmentCode();

        for (const row of shipmentTable) {
            row.shipment_code = generatedShipmentCode;
        }
        // Save
        console.log("shipment to save:", shipmentTable);
        //await this.shipmentRepo.save(shipment);
        await this.shipmentTableRepo.save(shipmentTable);

        return {
            shipmentTable,
        };
    }

    async createInvoice(createInvoice: CreateInvoiceDTO): Promise<Shipments> {

        //check shipmentcode
        if (createInvoice.shipmentCode) {
            const exists = await this.shipmentRepo.exists({
                where: { shipmentCode: createInvoice.shipmentCode },
            });

            if (exists) {
                throw new Error(`Shipment code ${createInvoice.shipmentCode} already exists`);
            }
        }
        const shipmentEntity: DeepPartial<Shipments> = {
            ...createInvoice,
            //shipment_code: await this.generateShipmentCode(),
            additionalText: createInvoice.additionalText ?? false,
            customerInvoice: createInvoice.customerInvoice ?? false,
            bank_details: createInvoice.bankDetails ? { id: createInvoice.bankDetails } : undefined,
            client: createInvoice.client ? { id: createInvoice.client } : undefined,
            destination: createInvoice.destination ? { id: createInvoice.destination } : undefined,
            created_at: new Date(),
            updated_at: new Date(),
        };

        const savedInvoice = await this.shipmentRepo.save(shipmentEntity);

        const invoice = await this.shipmentRepo.findOne({
            where: { id: savedInvoice.id },
            relations: ['client', 'bank_details', 'destination'],
        });

        if (!invoice) {
            throw new Error('Invoice not found after saving');
        }

        return invoice;
    }


    async generatedInvoicePdf(invoice: Shipments): Promise<void> {

    }

    //generate patteren for shipment_code
    private async generateShipmentCode(): Promise<string> {
        //get the lest shipment code 
        const lastShipment = await this.shipmentTableRepo
            .createQueryBuilder('shipment')
            .where("shipment.shipment_code LIKE :prefix", { prefix: 'SHIP%' })
            .orderBy('shipment.shipment_code', 'DESC')
            .getOne();

        let nextNumber = 1;
        if (lastShipment && lastShipment.shipment_code) {
            //extract the number part of the last shipment code
            const lastCode = lastShipment.shipment_code.match(/(\d+)$/);
            if (lastCode) {
                nextNumber = parseInt(lastCode[0], 10) + 1;
            }
        }
        const FormattedNumber = nextNumber.toString().padStart(6, '0');
        return `SHIP${FormattedNumber}`;
    }
    /*//generate patteren for shipment_code
    private async generateShipmentCode(): Promise<string> {
        let code: string;
        let exists = true;

        do {
            // get the last shipment_code
            const lastShipment = await this.shipmentTableRepo
                .createQueryBuilder('shipment')
                .where("shipment.shipment_code LIKE :prefix", { prefix: 'SHIP%' })
                .orderBy('shipment.shipment_code', 'DESC')
                .getOne();

            let nextNumber = 1;
            if (lastShipment?.shipment_code) {
                const lastCode = lastShipment.shipment_code.match(/(\d+)$/);
                if (lastCode) {
                    nextNumber = parseInt(lastCode[0], 10) + 1;
                }
            }

            const formattedNumber = nextNumber.toString().padStart(6, '0');
            code = `SHIP${formattedNumber}`;

            // check if it already exist in BS
            exists = await this.shipmentTableRepo.exists({ where: { shipment_code: code } });
        } while (exists);

        return code;
    }
*/
    /*******************************************ADD NEW STYLE*************************************************/
    /*    async addStyleOrderhead(dto: AddStyleDto): Promise<Orderline> {
            const orderhead = await this.orderheadRepo.findOneBy({ id: dto.orderhead_id });
            if (!orderhead) {
                throw new NotFoundException(`Orderhead ${dto.orderhead_id} not found`);
            }
    
            const orderline = this.orderLineRepo.create({
                order_id: dto.order_id,
                price: dto.price,
                style_code: dto.style_code,
                style_description: dto.style_description,
                status: dto.status,
                shipment: dto.shipment,
                quantity_to_be_shipped: dto.quantity_to_be_shipped,
                quantity_shipped: dto.quantity_shipped,
                quantity: dto.quantity,
                sales_price: dto.sales_price,
                hs_code: dto.hs_code,
                terms:dto.terms,
                orderhead,
            });
    
            return this.orderLineRepo.save(orderline);
        }
    */
    async addStyleOrderhead(dto: AddStyleDto): Promise<Orderline> {
        const orderhead = await this.orderheadRepo.findOneBy({ id: dto.orderhead_id });
        if (!orderhead) {
            throw new NotFoundException(`Orderhead ${dto.orderhead_id} not found`);
        }
        const style: DeepPartial<Orderline> = {
            ...dto,
            orderhead,
        }
        const savedStyle = await this.orderLineRepo.save(style);
        return savedStyle;
    }

    async updateStyle(id: number, dto: UpdateStyleDto): Promise<Orderline> {
        const orderline = await this.orderLineRepo.findOne({ where: { id } });
        if (!orderline) {
            throw new NotFoundException(`Orderline ${id} not found`);
        }
        Object.assign(orderline, dto);
        return this.orderLineRepo.save(orderline);
    }
}
