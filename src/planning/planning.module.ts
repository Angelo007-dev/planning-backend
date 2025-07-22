import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orderline } from 'src/entities/orderlines/orderlines';

@Module({
  imports: [TypeOrmModule.forFeature([Orderline])],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule { }
