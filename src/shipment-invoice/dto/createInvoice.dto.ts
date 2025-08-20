import {
    IsString,
    IsInt,
    IsOptional,
    IsDate,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDTO {
    @IsInt()
    @IsOptional()
    client?: number;

    @IsString()
    shipmentCode: string;

    @IsString()
    invoiceType: string;

    @IsString()
    @IsOptional()
    toAddress?: string;

    @IsString()
    @IsOptional()
    flex_contract_number?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    invoiceDate?: Date;

    @IsInt()
    @IsOptional()
    invoiceNumber?: number;

    @IsNumber()
    @IsOptional()
    invoiceAmount?: number;

    @IsString()
    @IsOptional()
    customer_order_number?: string;

    @IsInt()
    @IsOptional()
    cartons?: number;

    @IsNumber()
    @IsOptional()
    gw?: number;

    @IsNumber()
    @IsOptional()
    nw?: number;

    @IsNumber()
    @IsOptional()
    cbm?: number;

    @IsString()
    @IsOptional()
    name_forwarder?: string;

    @IsInt()
    @IsOptional()
    tracking_number?: number;

    @IsString()
    @IsOptional()
    freight?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    eta_date?: Date;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsString()
    @IsOptional()
    nameVessel?: string;

    @IsString()
    @IsOptional()
    voyageNumber?: string;

    @IsString()
    @IsOptional()
    shipmentMode?: string;

    @IsString()
    @IsOptional()
    mbl?: string;

    @IsString()
    @IsOptional()
    hbl?: string;

    @IsString()
    @IsOptional()
    fligthNumber?: string;

    @IsString()
    @IsOptional()
    flightFrom?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    flightDate?: Date;

    @IsString()
    @IsOptional()
    mawb1?: string;

    @IsString()
    @IsOptional()
    mawb2?: string;

    @IsString()
    @IsOptional()
    mawb3?: string;

    @IsString()
    @IsOptional()
    hawb?: string;

    @IsString()
    @IsOptional()
    currencyCode?: string;

    @IsString()
    incoterms: string;

    @IsNumber()
    @IsOptional()
    volume?: number;

    @IsString()
    @IsOptional()
    reference?: string;

    @IsString()
    @IsOptional()
    otherCostShip?: string;

    @IsString()
    @IsOptional()
    otherCostsAir?: string;

    @IsString()
    @IsOptional()
    freightChargesAir?: string;

    @IsString()
    @IsOptional()
    freightChargesShip?: string;

    @IsNumber()
    deposit: number;

    @IsInt()
    @IsOptional()
    bankDetails?: number;

    @IsInt()
    @IsOptional()
    poNumber?: number;

    @IsString()
    @IsOptional()
    brandName?: string;

    @IsString()
    @IsOptional()
    shipmentFrom?: string;

    @IsString()
    @IsOptional()
    tc1?: string;

    @IsString()
    @IsOptional()
    carrier?: string;

    @IsInt()
    @IsOptional()
    destination?: number;

    @IsString()
    @IsOptional()
    dom_nr?: string;

    @IsBoolean()
    @IsOptional()
    extraText?: boolean;

    @IsBoolean()
    @IsOptional()
    additionalText?: boolean;

    @IsBoolean()
    @IsOptional()
    customerInvoice?: boolean;

    @IsString()
    @IsOptional()
    seal1?: string;

}
