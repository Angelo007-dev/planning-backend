import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { ShipmentInvoiceService } from './shipment-invoice.service';
import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Request } from 'express';
import { Shipments } from 'src/entities/shipment_advice.entity';

@Controller('shipment-invoice')
export class ShipmentInvoiceController {
    constructor(private readonly shipmentService: ShipmentInvoiceService) { }

    //get all orders not shipped 
    @Get('/AllOrdersNotShipped')
    getAllOrderNotShipped(@Query() query: QueryParamsDto, @Req() req: Request) {
        return this.shipmentService.findAllOrdersNotShipped(query, req);
    }

    /*@Get('/shipment-code/generateShipmentCode')
    generateShipmentCode(): Promise<string> {
        return this.shipmentService.generateShipmentCode();
    }*/

    //get all ordersline linked on on orderhead  
    /* @Get('/AllOrderlineByOrder/:id')
     getAllOrderlineByOrder(
         @Param('id') id: number) {
         return this.shipmentService.findAllOrderlineByOrder(id);
     }*/

    @Get('/AllOrderheadByOrderline/:id')
    getAllOrderheadByOrderline(
        @Param('id') id: number) {
        return this.shipmentService.findAllOrderheadByOrderline(id);
    }

    //create shipment for an oreder
    /*@Patch('orderlines/:id/shipment')
    updateOrderLineShipment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateShipmentDTO
    ) {
        return this.shipmentService.createShipment(id, dto);
    }*/

    //create shipment for an oreder
    @Post('/create')
    create(@Body() dto: CreateShipmentDTO) /*:Promise<Shipments>*/ {
        return this.shipmentService.create(dto);
    }
    /*@Post('/shipment/create')
    createShipment(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CreateShipmentDTO
    ) {
        return this.shipmentService.createShipment(id, dto);
    }*/
}
