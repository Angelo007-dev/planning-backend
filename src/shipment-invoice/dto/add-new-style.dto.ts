import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStyleDto {
    @IsString()
    order_id: string;

    @IsString()
    style_code: string;

    @IsString()
    style_description: string;

    @IsString()
    status: string;

    @IsString()
    shipment?: string;

    @IsString()
    terms?: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    @IsOptional()
    quantity_to_be_shipped: number;

    @IsNumber()
    quantity_shipped: number;

    @IsNumber()
    price: number;

    @IsNumber()
    sales_price: number;

    @IsNumber()
    factory_cmt: number;

    @IsOptional()
    @IsString()
    hs_code?: string | null;

    @IsNumber()
    orderhead_id: number;
}
