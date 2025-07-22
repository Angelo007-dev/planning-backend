import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';

dotenv.config();
const config = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    entities: [],
    synchronize: true,
    migrationsRun: false,
    logging: true,
}
export default registerAs('typeorm', () => config);
export const AppDataSource = new DataSource(config as DataSourceOptions);