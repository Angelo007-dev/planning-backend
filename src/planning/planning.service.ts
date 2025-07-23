import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orderline } from 'entities/orderlines/orderlines';
import { Repository } from 'typeorm';
import { AssignFactoryDTO } from './dto/assignFactory.dto';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';

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

  async findAllPanningNotAllocated(query: QueryParamsDto, req) {
    const qb = this.orderLineRepo.createQueryBuilder('ol');
    qb.innerJoinAndSelect('ol.orderhead', 'oh');
    qb.innerJoinAndSelect('oh.clients', 'c');
    qb.andWhere(`ol.factory1  IS NULL OR ol.factory1 = '' AND ol.factory2 IS NULL OR ol.factory2 = ''`);

    if (query.search) {
      qb.andWhere('oh.code like  :global_search ', {
        global_search: '%' + query.search + '%'
      })
    }
    qb.limit(10)
    qb.orderBy('ol.request', 'ASC')
    qb.select([
      'ol.id',
      'c.name',
      'oh.order_id',
      'ol.request',
      'oh.code',
      //'oh.confirmdate',
      'oh.yarn_etd',
      'oh.yarn_eta',
      'ol.shipment',
      'ol.kpa',
      //'oh.code',
      'ol.style_description',
      'ol.status',
      //'ol.quantity',
      'oh.Yarncomp',
      'ol.style_code',
      //'ol.style_description',
      'ol.gauge_code',
      'ol.machine_type',
      'ol.quantity_to_be_shipped',
      'ol.factory1',
      'ol.factory2',
    ])
    return qb.getRawMany();

  }

  async findAllPanningAllocated(query: QueryParamsDto, req) {
    const qb = this.orderLineRepo.createQueryBuilder('ol');
    qb.innerJoinAndSelect('ol.orderhead', 'oh');
    qb.innerJoinAndSelect('oh.clients', 'c');
    qb.andWhere('(ol.factory1 IS NOT NULL OR ol.factory2 IS NOT NULL)');

    if (query.search) {
      qb.andWhere('oh.code like  :global_search ', {
        global_search: '%' + query.search + '%'
      })
    }
    qb.limit(10)
    qb.orderBy('ol.request', 'ASC')
    qb.select([
      'ol.id',
      'c.name',
      'oh.order_id',
      'ol.request',
      'oh.code',
      'oh.confirmdate',
      'oh.yarn_etd',
      'oh.yarn_eta',
      'ol.shipment',
      'ol.kpa',
      'ol.style_description',
      'ol.status',
      //'ol.quantity',
      'oh.Yarncomp',
      'ol.style_code',
      //'ol.style_description',
      'ol.gauge_code',
      'ol.machine_type',
      'ol.quantity_to_be_shipped',
      'ol.factory1',
      'ol.factory2',
    ])
    return qb.getRawMany();

  }

  /*async findAllPanningAllocated() {
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
      .getRawMany();*/

  async updateFactories(id: number, factory1: string | null, factory2: string | null): Promise<Orderline> {
    const orderline = await this.orderLineRepo.findOne({ where: { id } });

    if (!orderline) {
      throw new NotFoundException(`Orderline with ID ${id} not found`);
    }

    // update des factories
    orderline.factory1 = factory1;
    orderline.factory2 = factory2;

    // status logics
    /*if (factory1 && factory2) {
      orderline.status = 'Allocated';
    } else if (factory1 || factory2) {
      orderline.status = 'Partly Allocated';
    } else {
      orderline.status = 'Not Allocated';
    }*/

    return await this.orderLineRepo.save(orderline);
  }


}
