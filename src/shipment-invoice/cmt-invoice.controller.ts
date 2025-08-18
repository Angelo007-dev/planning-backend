import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { QueryParamsDto } from 'src/database/dto/QueryParams.dto';
import { ShipmentInvoiceService } from './shipment-invoice.service';
import { CreateShipmentDTO } from './dto/createShipment.dto';
import { Request } from 'express';
import { Shipments } from 'src/entities/shipment_advice.entity';
import { CreateInvoiceDTO } from './dto/createInvoice.dto';
import { CreateCmtInvoicesDTO } from './dto/create-cmt-invoice.dto';
import { CmtInvoiceService } from './cmt-invoice.service';

@Controller('cmt-invoice')
export class CmtInvoiceController {
    constructor(private readonly cmtIncoiceSercvice: CmtInvoiceService) { }

    //createCmtInvoice for an order
    @Post('/create')
    createInvoice(@Body() dto: CreateCmtInvoicesDTO)/**:Promise<Shipments> */ {
        return this.cmtIncoiceSercvice.createCmtInvoice(dto);
    }
}
