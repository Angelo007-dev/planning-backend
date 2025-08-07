import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { DataSource, In, Repository } from 'typeorm';
import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { ShipementsTable } from 'src/entities/shipments.entity';
import { last } from 'rxjs';
import { BankDetails } from 'src/entities/bank-details.entity';
import { Destinations } from 'src/entities/destination.entity';
import { Clients } from 'src/entities/client/clients';

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

    /*async create(createDto: CreateShipmentDTO): Promise<Shipments>  {
        const {
            //orderlines,
            orderline_ids,
            invoice_type,
            incoterms,
            deposit,
            bank_details_id,
            //customer_address,
            destination_id,
            additional_text,
            customer_invoice,
            hs_code,
            quantity_to_ship,
        } = createDto;

        const orderheads: Orderheads[] = [];

        const shipmentTable: ShipementsTable[] = [];
        for (let i = 0; i < orderline_ids.length; i++) {

            const orderline = await this.orderLineRepo.findOne({
                where: { id: orderline_ids[i] },
                relations: ['orderhead'],
            });
            if (!orderline) {
                throw new NotFoundException(`Orderhead with orderline  ID ${orderline_ids[i]} not found`);
            }
            orderline.hs_code = hs_code;
            orderline.quantity_shipped = quantity_to_ship;
            //await this.orderLineRepo.save(orderline);

            const orderhead = orderline.orderhead;
            if (!orderhead) {
                throw new NotFoundException(`OrderHead not found for OrderLine ID ${orderline_ids[i]}`);
            }

            orderheads.push(orderhead);

            const tableRow = this.shipmentTableRepo.create({
                shipment_code: '',
                orderhead_id: orderhead.id,
                orderline_id: orderline.id,
                shipped: orderline.quantity_shipped,
                created_at: new Date(),
                updated_at: new Date(),
            });

            shipmentTable.push(tableRow);
        }

        const generatedShipmentCode = await this.generateShipmentCode();

        for (const row of shipmentTable) {
            row.shipment_code = generatedShipmentCode;
        }

        //await this.shipmentTableRepo.save(shipmentTable);
        let bank_details = bank_details_id ? await this.bankDetailsRepo.findOne({
            where: { id: bank_details_id },
            select: ['name'],
            // relations: ['shipment_advice'],
        }) : undefined;

        if (!bank_details) {
            bank_details = undefined;
            //throw new NotFoundException(`Bank details not found`);
        }

        let destination = destination_id ? await this.destinationRepo.findOne({
            where: { id: destination_id },
            select: ['city'],
            //relations: ['shipment_advice'],
        }) : undefined;

        if (!destination) {
            destination = undefined;
            //throw new NotFoundException(`Destination not found`);
        }


        const shipment = this.shipmentRepo.create({
            shipment_code: generatedShipmentCode,
            invoice_type,
            incoterms,
            deposit,
            bank_details: bank_details ?? undefined,
            destination: destination ?? undefined,
            //destination: destination ?? undefined,
            additional_text,
            customer_invoice,
            //hs_code,
            //quantity_to_ship,
            //hs_code: orderline_ids.length > 0 ? orderline_ids[0].toString() : hs_code, // Use first orderline's hs_code or provided one
            //quantity_to_ship: orderline_ids.length > 0 ? quantity_to_ship : 0,
            orderheads: orderheads,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return {
            //message: 'Test uniquement : aucune sauvegarde',
            shipmentTable: shipmentTable,
            shipment: shipment

        };
        //return await this.shipmentRepo.save(shipment);
    }
*/
    async create(createDto: CreateShipmentDTO) {
        const {
            //shipment_code,
            invoice_type,
            incoterms,
            deposit,
            bank_details_id,
            destination_id,
            additional_text,
            customer_invoice,
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
                shipment_code: '',
                orderhead_id: orderhead.id,
                orderline_id: orderline.id,
                shipped: ol.quantity_to_ship,
                created_at: new Date(),
                updated_at: new Date(),
            });

            shipmentTable.push(tableRow);
        }

        const generatedShipmentCode = await this.generateShipmentCode();

        for (const row of shipmentTable) {
            row.shipment_code = generatedShipmentCode;
        }

        const bank_details = bank_details_id
            ? await this.bankDetailsRepo.findOne({
                where: { id: bank_details_id },
                //select: ['id', 'name'],
            })
            : undefined;

        const destination = destination_id
            ? await this.destinationRepo.findOne({
                where: { id: destination_id },
                //select: ['id', 'city'],
            })
            : undefined;

        const shipment = this.shipmentRepo.create({
            shipment_code: generatedShipmentCode,
            invoice_type,
            incoterms,
            deposit,
            bank_details: bank_details ?? undefined,
            destination: destination ?? undefined,
            additional_text,
            customer_invoice,
            orderheads: orderheads,
            created_at: new Date(),
            updated_at: new Date(),
        });

        //don't send to the reques when it's undefined
        Object.keys(shipment).forEach((key) => {
            if (shipment[key] === undefined) {
                delete shipment[key];
            }
        });
        // Save
        await this.shipmentRepo.save(shipment);
        await this.shipmentTableRepo.save(shipmentTable);

        return {
            message: 'Shipment created successfully',
            shipment,
            shipmentTable,
        };
    }
    /*async create(createDto: CreateShipmentDTO) {
        const {
            shipment_code,
            invoice_type,
            incoterms,
            deposit,
            bank_details_id,
            destination_id,
            additional_text,
            customer_invoice,
            orderlines,
        } = createDto;

        //Extract the orderlines IDs 
        const orderlineIds = orderlines.map(ol => ol.id);

        const foundOrderlines = await this.orderLineRepo.find({
            where: { id: In(orderlineIds) },
            relations: ['orderhead'],
        });

        if (foundOrderlines.length !== orderlineIds.length) {
            const foundIds = new Set(foundOrderlines.map(ol => ol.id));
            const missingIds = orderlineIds.filter(id => !foundIds.has(id));
            throw new NotFoundException(`Missing orderlines: ${missingIds.join(', ')}`);
        }

        const orderheadsMap = new Map<number, Orderheads>();
        const shipmentTable: ShipementsTable[] = [];

        for (const ol of orderlines) {
            const foundOL = foundOrderlines.find(o => o.id === ol.id)!;

            foundOL.hs_code = ol.hs_code;
            foundOL.quantity_shipped = ol.quantity_to_ship;

            const orderhead = foundOL.orderhead;
            if (!orderhead) {
                throw new NotFoundException(`OrderHead not found for OrderLine ID ${ol.id}`);
            }

            orderheadsMap.set(orderhead.id, orderhead);

            shipmentTable.push(
                this.shipmentTableRepo.create({
                    shipment_code: '',
                    orderhead_id: orderhead.id,
                    orderline_id: foundOL.id,
                    shipped: ol.quantity_to_ship,
                    created_at: new Date(),
                    updated_at: new Date(),
                })
            );
        }

        const generatedShipmentCode = await this.generateShipmentCode();

        shipmentTable.forEach(row => {
            row.shipment_code = generatedShipmentCode;
        });

        const [bank_details, destination] = await Promise.all([
            bank_details_id
                ? this.bankDetailsRepo.findOne({ where: { id: bank_details_id }, select: ['id', 'name'] })
                : Promise.resolve(undefined),
            destination_id
                ? this.destinationRepo.findOne({ where: { id: destination_id }, select: ['id', 'city'] })
                : Promise.resolve(undefined),
        ]);

        const shipment = this.shipmentRepo.create({
            shipment_code: generatedShipmentCode,
            invoice_type,
            incoterms,
            deposit,
            bank_details: bank_details ?? undefined,
            destination: destination ?? undefined,
            additional_text,
            customer_invoice,
            orderheads: Array.from(orderheadsMap.values()),
            created_at: new Date(),
            updated_at: new Date(),
        });

        //save
        await this.shipmentRepo.save(shipment);
        await this.shipmentTableRepo.save(shipmentTable);

        return {
            message: 'Shipment created successfully',
            shipment,
            shipmentTable,
        };
    }*/


    //generate patteren for shipment_code
    private async generateShipmentCode(): Promise<string> {
        //get the lest shipment code 
        const lastShipment = await this.shipmentRepo
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

}
