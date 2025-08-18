import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsDateString, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";


export class CreateCmtInvoiceLineDTO {

    @IsInt()
    cmt_invoice_id: number;

    orderlines: {
        id: number;
        hs_code: string;
        quantity_to_ship: number;
    }[];

    /*  @IsInt()
      ordeline_ids: number[]
  */
    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;

}