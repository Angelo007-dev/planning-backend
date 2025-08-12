import { IsBoolean, IsDate, IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class createInvoiceDTO {

    @IsInt()
    client_id?: number;

    @IsString()
    shipment_code: string;

    @IsString()
    invoice_type: string;

    @IsString()
    to_address?: string;

    @IsString()
    flex_contract_number: string;

    @IsDate()
    invoice_date?: Date;

    @IsInt()
    invoice_number?: number;

    @IsInt()
    invoice_amount?: number;

    @IsString()
    customer_order_number?: string;

    @IsInt()
    carton?: number;

    @IsInt()
    gw?: number;

    @IsInt()
    nw?: number;

    @IsInt()
    cbm?: number;

    @IsString()
    name_forwarder?: string;

    @IsInt()
    tracking_number?: number;

    @IsString()
    freight?: string;

    @IsDate()
    eta_date?: Date;

    @IsString()
    comment?: string;

    @IsString()
    name_vessel?: string;

    @IsString()
    voyage_number?: string;

    @IsString()
    shipment_mode?: string;

    @IsString()
    mbl?: string;

    @IsString()
    hbl?: string;

    @IsString()
    fligth_number?: string;

    @IsString()
    flight_from?: string;

    @IsDate()
    flight_date?: Date;

    @IsString()
    mawb1?: string;

    @IsString()
    mawb2?: string;

    @IsString()
    mawb3?: string;

    @IsString()
    hawb?: string;

    @IsString()
    currerncy_code?: string;

    @IsString()
    invoice_code?: string;

    @IsDecimal()
    volume?: number;

    @IsString()
    reference?: string;

    @IsString()
    incoterms: string;

    @IsString()
    other_costs_ship?: string;

    @IsString()
    other_costs_aire?: string;

    @IsString()
    freight_charges_air?: string;

    @IsString()
    freight_charges_ship?: string;

    @IsDecimal()
    deposit: number;

    @IsString()
    bank_details: string;

    @IsInt()
    po_no?: number;

    @IsString()
    brand_name?: string;

    @IsString()
    shipment_from?: string;

    @IsString()
    shipment_tc1?: string;

    @IsString()
    carrier?: string;

    @IsString()
    destination: string;

    @IsString()
    dom_nr?: string;

    @IsBoolean()
    additional_text?: boolean

    @IsString()
    extra_text?: string;

    @IsBoolean()
    customer_invoice?: boolean;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;

}
