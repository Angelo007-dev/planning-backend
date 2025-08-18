import {
    IsString,
    IsInt,
    IsOptional,
    IsDate,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCmtInvoicesDTO {

    @IsString()
    shipment_code: string;

    @IsString()
    @IsOptional()
    to_address?: string;

    @IsString()
    @IsOptional()
    flex_contract_number?: string;

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
    carton_id?: number;

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
    currency_code?: string;

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
    other_costs_air?: string;

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

    @IsBoolean()
    @IsOptional()
    extra_text?: boolean;

    @IsBoolean()
    @IsOptional()
    customer_invoice?: boolean;

}
