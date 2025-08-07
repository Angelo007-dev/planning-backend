import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShipmentInvoiceModule } from './shipment-invoice/shipment-invoice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/config/shipment.connection';
import { ConfigModule } from '@nestjs/config';
import typeorm from './database/config/shipment.connection';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env', load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
        retryDelay: 10000,
        retryAttempts: 10
      })
    }),
    ShipmentInvoiceModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }