import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { ShipmentInvoiceService } from './shipment-invoice.service';
import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Request } from 'express';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { CreateInvoiceDTO } from './dto/createInvoice.dto';

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

    @Get('/getBankLinked/OrderCurrency/:id')
    getBankLinkedOnOrderCurrency(
        @Param('id') id: number) {
        return this.shipmentService.findBankLinkedOnOrderCurrency(id);
    }

    @Get('/get/Client/Destination/:id')
    getClienDestination(
        @Param('id') id: number) {
        return this.shipmentService.findClientDestination(id);
    }

    @Post('/common-client')
    getClientOrederhead(@Body() body: { orderheadIds: number[] }) {
        return this.shipmentService.findCommonClient(body.orderheadIds);
    }

    //create shipment for an oreder
    @Post('/create')
    create(@Body() dto: CreateShipmentDTO) /*:Promise<Shipments>*/ {
        return this.shipmentService.create(dto);
    }

    //createInvoice for an order
    @Post('/create/invoices')
    createInvoice(@Body() dto: CreateInvoiceDTO)/**:Promise<Shipments> */ {
        return this.shipmentService.createInvoice(dto);
    }
}
