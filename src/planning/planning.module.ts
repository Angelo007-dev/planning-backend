import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderheads } from 'entities/orderhead/orderheads';
import { Clients } from 'entities/client/clients';
import { Orderline } from 'entities/orderlines/orderlines';

@Module({
  imports: [TypeOrmModule.forFeature([Orderline, Orderheads, Clients])],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule { }
