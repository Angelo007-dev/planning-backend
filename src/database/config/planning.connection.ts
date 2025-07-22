import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { Orderheads } from 'src/entities/orderhead/orderheads';
import { Clients } from 'src/entities/client/clients';
import { Planning } from 'src/planning/entities/planning.entity';
import { Orderline } from 'src/entities/orderlines/orderlines';

dotenv.config();
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [Orderheads, Orderline, Clients, Planning],
    synchronize: false,
    migrationsRun: false,
    logging: true,
}
export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);