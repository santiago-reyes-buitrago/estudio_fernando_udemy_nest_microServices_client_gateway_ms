import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

enum OrderStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalAmount: number;
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalItems: number;
  @IsEnum(OrderStatus)
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;
  @IsOptional()
  @IsBoolean()
  paid: boolean = false;
}
