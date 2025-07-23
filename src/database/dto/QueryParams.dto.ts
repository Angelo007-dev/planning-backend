import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class QueryParamsDto {
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(10000)
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsString()
    sort?: string;

    @IsOptional()
    search?: Record<string, string>;

    @IsOptional()
    global_search?: any;
}