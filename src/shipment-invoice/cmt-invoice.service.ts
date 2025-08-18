import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { DataSource, DeepPartial, In, Repository } from 'typeorm';
//import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { ShipementsTable } from 'src/entities/shipments.entity';
import { last } from 'rxjs';
import { BankDetails } from 'src/entities/bank-details.entity';
import { Destinations } from 'src/entities/destination.entity';
import { Clients } from 'src/entities/client/clients';
import { CreateCmtInvoicesDTO } from './dto/create-cmt-invoice.dto';
import { CmtInvoices } from 'src/entities/cmt-invoices.entity';
import { CreateCmtInvoiceLineDTO } from './dto/create-cmt-invoice-line.dto';
import { CmtInvoiceLine } from 'src/entities/cmt-invoice-line.entity';
//import { CreateInvoiceDTO } from './dto/createInvoice.dto';

@Injectable()
export class CmtInvoiceService {
    constructor(

        @InjectRepository(Orderheads)
        private readonly orderheadRepo: Repository<Orderheads>,

        @InjectRepository(Orderline)
        private readonly orderLineRepo: Repository<Orderline>,
        @InjectRepository(CmtInvoices)
        private readonly cmtInvoiceRepo: Repository<CmtInvoices>,

        @InjectRepository(CmtInvoiceLine)
        private readonly CmtInvoiceLineRepo: Repository<CmtInvoiceLine>,

        @InjectRepository(BankDetails)
        private readonly bankDetailsRepo: Repository<BankDetails>,

        @InjectRepository(Destinations)
        private readonly destinationRepo: Repository<Destinations>,

        @InjectRepository(Clients)
        private readonly clientRepo: Repository<Clients>
    ) { }

    async createCmtInvoice(createCmtInvoice: CreateCmtInvoicesDTO): Promise<CmtInvoices> {

        const shipmentEntity: DeepPartial<CmtInvoices> = {
            ...createCmtInvoice,
            bank_details: createCmtInvoice.bank_detailsId ? { id: createCmtInvoice.bank_detailsId } : undefined,
            //createCmtInvoice: createCmtInvoice.client_id ? { id: createCmtInvoice.client_id } : undefined,
            destination: createCmtInvoice.destinationId ? { id: createCmtInvoice.destinationId } : undefined,
        };

        const savedInvoice = await this.cmtInvoiceRepo.create(shipmentEntity);

        ///await this.generatedInvoicePdf(savedInvoice);
        return savedInvoice;
    }

    async create(createDto: CreateCmtInvoiceLineDTO) {
        const {
            //cmt_invoice_id,
            orderlines,
        } = createDto;

        const orderheads: Orderheads[] = [];
        const cmt_invoice_table: CmtInvoiceLine[] = [];



        for (const ol of orderlines) {
            const orderline = await this.orderLineRepo.findOne({
                where: { id: ol.id },
                relations: ['orderhead'],
            });

            if (!orderline) {
                throw new NotFoundException(`OrderLine not found`);
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

            const tableRow = this.CmtInvoiceLineRepo.create({
                //shipment_code: '',
                orderhead_id: orderhead.id,
                orderline_id: orderline.id,
                shipped: ol.quantity_to_ship,
                created_at: new Date(),
                updated_at: new Date(),
            });

            cmt_invoice_table.push(tableRow);
        }
        //console.log('shipmentTable to save:', shipmentTable);
        //await this.shipmentTableRepo.save(shipmentTable);

        const generatedCmtInvoiceId = await this.generateCmtInvoiceId();

        for (const row of cmt_invoice_table) {
            row.cmt_invoice_id = generatedCmtInvoiceId;
        }
        // Save
        console.log("cmt invoice to save:", cmt_invoice_table);
        //await this.shipmentRepo.save(shipment);
        //await this.shipmentTableRepo.save(shipmentTable);

        return {
            cmt_invoice_table,
        };
    }
    async generatedInvoicePdf(invoice: Shipments): Promise<void> {

    }

    //generate patteren for shipment_code
    private async generateCmtInvoiceId(): Promise<number> {
        //get the lest shipment code 
        const cmtInvoice = await this.CmtInvoiceLineRepo
            .createQueryBuilder('cmt_invoice_line')
            //.where("cmt_invoice_line.cmt_invoice_id LIKE :prefix", { prefix: 'SHIP%' })
            .orderBy('cmt_invoice_line.cmt_invoice_id', 'DESC')
            .getOne();

        let nextNumber = 1;
        if (cmtInvoice && cmtInvoice.cmt_invoice_id) {
            //extract the number part of the last shipment code
            // const lastCode = cmtInvoice.cmt_invoice_id.match(/(\d+)$/);
            nextNumber = cmtInvoice.cmt_invoice_id + 1;
        }
        //const FormattedNumber = nextNumber.toString().padStart(6, '0');
        return nextNumber;
    }

}
