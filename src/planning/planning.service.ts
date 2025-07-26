import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderline } from 'entities/orderlines/orderlines';
import { Repository } from 'typeorm';
import {AssignFactoryDTO } from './dto/assignFactory.dto';

@Injectable()
export class PlanningService {
  constructor(@InjectRepository(Orderline) private readonly orderLineRepo: Repository<Orderline>) { }
  create(createPlanningDto: CreatePlanningDto) {
    return 'This action adds a new planning';
  }

  findAll() {
    return `This action returns all planning`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planning`;
  }

  update(id: number, updatePlanningDto: UpdatePlanningDto) {
    return `This action updates a #${id} planning`;
  }

  remove(id: number) {
    return `This action removes a #${id} planning`;
  }

  async findAllPanningNotAllocated() {
    return this.orderLineRepo
      .createQueryBuilder('ol')
      .innerJoinAndSelect('ol.orderhead', 'oh')
      .innerJoinAndSelect('oh.clients', 'c')
      .where('ol.status = :status', { status: 'allocated' })//status not shipped , just for test if the api work
      .andWhere('ol.factory1 IS NULL')
      .andWhere('ol.factory2 IS NULL')
      .orderBy('ol.id', 'ASC')
      .select([
        'c.name',
        //'oh.order_id',
        //'ol.code',
        //'ol.request',
        //'oh.confirmdate',
        //'oh.yarn_etd',
        // 'oh.yarn_eta',
        //'ol.shipment',
        //'ol.kpa',
        'oh.code',
        'ol.style_description',
        'ol.status',
        'ol.quantity',
        'oh.Yarncomp',
        'ol.style_code',
        //'ol.style_description',
        'ol.gauge_code',
        'ol.machine_type',
        //'ol.quantity_to_be_shipped',
        'ol.factory1',
        'ol.factory2',
      ])
      .getRawMany();
  }

  async findAllPanningAllocated() {
    return this.orderLineRepo
      .createQueryBuilder('ol')
      .innerJoinAndSelect('ol.orderhead', 'oh')
      .innerJoinAndSelect('oh.clients', 'c')
      .where('ol.status = :status', { status: 'allocated' })//status not shipped , just for test if the api work
      .andWhere('ol.factory1 IS NOT NULL')
      .andWhere('ol.factory2 IS NOT NULL')
      .orderBy('ol.id', 'ASC')
      .select([
        'c.name',
        //'oh.order_id',
        //'ol.code',
        //'ol.request',
        //'oh.confirmdate',
        //'oh.yarn_etd',
        // 'oh.yarn_eta',
        //'ol.shipment',
        //'ol.kpa',
        'oh.code',
        'ol.style_description',
        'ol.status',
        'ol.quantity',
        'oh.Yarncomp',
        'ol.style_code',
        //'ol.style_description',
        'ol.gauge_code',
        'ol.machine_type',
        //'ol.quantity_to_be_shipped',
        'ol.factory1',
        'ol.factory2',
      ])
      .getRawMany();
  }

  async assignFactories(dto: AssignFactoryDTO) {
    const { orderlinedId, factory1, factory2 } = dto;

    const orderline = await this.orderLineRepo.findOneBy({ id: orderlinedId });
    if (!orderline) {
      throw new NotFoundException(`Orderline with id ${orderlinedId} not found`);
    }
    orderline.factory1 = factory1;
    if (factory2) {
      orderline.factory2 = factory2;
    }

    return this.orderLineRepo.save(orderline);
  }

}


/*.createQueryBuilder('ol')
      .innerJoinAndSelect('ol.orderhead', 'oh')  // jointure Orderhead
      .innerJoinAndSelect('oh.clients', 'c')     // jointure Clients via Orderhead
      .getMany();*/