import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from './database/config/planning.connection';
import { PlanningModule } from './module/planning/planning.module';
import { PlanningModule } from './planning/planning.module';
import typeorm from './database/config/planning.connection';

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
    PlanningModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
