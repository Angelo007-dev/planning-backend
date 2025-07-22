import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderline } from 'src/entities/orderlines/orderlines';
import { Repository } from 'typeorm';

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
      .innerJoinAndSelect('ol.orderHead', 'oh')
      .innerJoinAndSelect('oh.client', 'c')
      .where('ol.status = :status', { status: 'Shipped' })//status not shipped , just for test if the api work
      .andWhere('ol.factory1 IS NULL')
      .andWhere('ol.factory2 IS NULL')
      .orderBy('ol.request', 'ASC')
      .select([
        'c.name',
        'oh.order_id',
        //'ol.request',
        //'oh.confirmdate',
        //'oh.yarn_etd',
        // 'oh.yarn_eta',
        //'ol.shipment',
        //'ol.kpa',
        'oh.Yarncomp',
        'ol.style_code',
        //'ol.style_description',
        'ol.seedle',
        'ol.machine_type',
        //'ol.quantity_to_be_shipped',
        'ol.factory1',
        'ol.factory2',
      ])
      .getRawMany();
  }

}
