import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentInvoiceService } from './shipment-invoice.service';
import { ShipmentInvoiceController } from './shipment-invoice.controller';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Clients } from 'src/entities/client/clients';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { Contact } from 'src/entities/contact.entity';
import { PaymentTerm } from 'src/entities/payment-term.entity';
import { Merchandiser } from 'src/entities/merchandiser.entity';
import { ShipementsTable } from 'src/entities/shipments.entity';
import { BankDetails } from 'src/entities/bank-details.entity';
import { Destinations } from 'src/entities/destination.entity';
import { Currencies } from 'src/entities/currencies.entity';
import { CmtInvoices } from 'src/entities/cmt-invoices.entity';
import { CmtInvoiceService } from './cmt-invoice.service';
import { CmtInvoiceController } from './cmt-invoice.controller';
import { CmtInvoiceLine } from 'src/entities/cmt-invoice-line.entity';
@Module({
    imports: [TypeOrmModule.forFeature([
        Orderline,
        Orderheads,
        Clients,
        Shipments,
        Contact,
        PaymentTerm,
        Merchandiser,
        ShipementsTable,
        BankDetails,
        Destinations,
        Currencies,
        CmtInvoices,
        CmtInvoiceLine
    ])],
    providers: [ShipmentInvoiceService, CmtInvoiceService],
    controllers: [ShipmentInvoiceController, CmtInvoiceController]
})
export class ShipmentInvoiceModule { }
