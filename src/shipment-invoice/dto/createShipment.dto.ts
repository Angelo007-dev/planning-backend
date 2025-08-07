import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateShipmentDTO {

    @IsString()
    shipment_code: string;

    @IsString()
    @IsOptional()
    invoice_type?: string;

    @IsString()
    @IsOptional()
    incoterms?: string;

    @IsInt()
    @IsOptional()
    deposit?: number;

    @IsBoolean()
    @IsOptional()
    additional_text?: boolean;

    @IsBoolean()
    @IsOptional()
    customer_invoice?: boolean;

    /*@IsOptional()
    //@IsInt()
    orderline_ids: number[];*/
    orderlines: {
        id: number;
        hs_code: string;
        quantity_to_ship: number;
    }[];

    @IsOptional()
    @IsInt()
    bank_details_id?: number;

    @IsOptional()
    @IsInt()
    destination_id?: number;


    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;

}