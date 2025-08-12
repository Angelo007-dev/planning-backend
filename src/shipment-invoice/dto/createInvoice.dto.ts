import {
    IsString,
    IsInt,
    IsOptional,
    IsDate,
    IsNumber,
    IsBoolean,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceDTO {
    @IsInt()
    @IsOptional()
    clientId?: number;

    @IsString()
    shipment_code: string;

    @IsString()
    invoice_type: string;

    @IsString()
    @IsOptional()
    to_address?: string;

    @IsString()
    @IsOptional()
    flex_conCtract_number?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    invoice_date?: Date;

    @IsInt()
    @IsOptional()
    invoice_number?: number;

    @IsNumber()
    @IsOptional()
    invoice_amount?: number;

    @IsString()
    @IsOptional()
    customer_order_number?: string;

    @IsInt()
    @IsOptional()
    carton?: number;

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
    name_vessel?: string;

    @IsString()
    @IsOptional()
    voyage_number?: string;

    @IsString()
    @IsOptional()
    shipment_mode?: string;

    @IsString()
    @IsOptional()
    mbl?: string;

    @IsString()
    @IsOptional()
    hbl?: string;

    @IsString()
    @IsOptional()
    fligth_number?: string;

    @IsString()
    @IsOptional()
    flight_from?: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    flight_date?: Date;

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
    currerncy_code?: string;

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
    other_costs_ship?: string;

    @IsString()
    @IsOptional()
    other_costs_aire?: string;

    @IsString()
    @IsOptional()
    freight_charges_air?: string;

    @IsString()
    @IsOptional()
    freight_charges_ship?: string;

    @IsNumber()
    deposit: number;

    @IsInt()
    @IsOptional()
    bank_detailsId?: number;

    @IsInt()
    @IsOptional()
    po_no?: number;

    @IsString()
    @IsOptional()
    brand_name?: string;

    @IsString()
    @IsOptional()
    shipment_from?: string;

    @IsString()
    @IsOptional()
    shipment_tc1?: string;

    @IsString()
    @IsOptional()
    carrier?: string;

    @IsInt()
    @IsOptional()
    destinationId?: number;

    @IsString()
    @IsOptional()
    dom_nr?: string;

    @IsString()
    @IsOptional()
    extra_text?: string;

    @IsBoolean()
    @IsOptional()
    customer_invoice?: boolean;

}
