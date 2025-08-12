import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Clients } from 'src/entities/client/clients';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { PaymentTerm } from 'src/entities/payment-term.entity';
import { Contact } from 'src/entities/contact.entity';
import { Country } from 'src/entities/country.entity';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { Merchandiser } from 'src/entities/merchandiser.entity';
import { ShipementsTable } from 'src/entities/shipments.entity';
import { BankDetails } from 'src/entities/bank-details.entity';
import { Destinations } from 'src/entities/destination.entity';
import { Currencies } from 'src/entities/currencies.entity';

dotenv.config();
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [
        Orderheads,
        Orderline,
        Clients,
        PaymentTerm,
        Contact,
        Country,
        Shipments,
        Merchandiser,
        ShipementsTable,
        BankDetails,
        Destinations,
        Currencies
    ],
    synchronize: false,
    migrationsRun: false,
    logging: true,
}
export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);