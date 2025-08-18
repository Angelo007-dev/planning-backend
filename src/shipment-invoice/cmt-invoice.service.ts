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

        @InjectRepository(ShipementsTable)
        private readonly shipmentTableRepo: Repository<ShipementsTable>,

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

    /* async createInvoice(createInvoice: CreateInvoiceDTO): Promise<Shipments> {
         //const client = createInvoice.clientId ? await this.clientRepo.findOne({ where: { id: createInvoice.clientId } }) : null;
         //const destination = createInvoice.destinationId ? await this.destinationRepo.findOne({ where: { id: createInvoice.destinationId } }) : null;
         //const bankDetails = createInvoice.bank_detailsId ? await this.bankDetailsRepo.findOne({ where: { id: createInvoice.bank_detailsId } }) : null;
 
         const shipmentEntity: DeepPartial<Shipments> = {
             ...createInvoice,
             bank_details: createInvoice.bank_detailsId ? { id: createInvoice.bank_detailsId } : undefined,
             client: createInvoice.client_id ? { id: createInvoice.client_id } : undefined,
             destination: createInvoice.destinationId ? { id: createInvoice.destinationId } : undefined,
         };
 
         const savedInvoice = await this.shipmentRepo.create(shipmentEntity);
 
         ///await this.generatedInvoicePdf(savedInvoice);
         return savedInvoice;
     }
 */
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

}
