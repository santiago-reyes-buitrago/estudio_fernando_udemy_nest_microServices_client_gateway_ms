import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsNumber({ maxDecimalPlaces: 4 })
  @IsPositive()
  @Type(() => Number)
  price: number;
}
