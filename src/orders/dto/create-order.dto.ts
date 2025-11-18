
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

enum OrderStatus {
  PENDING = 'PENDING', 
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  totalAmount: number;
  @IsNumber()
  @IsPositive()
  totalItems: number;
  @IsEnum(OrderStatus)
  @IsOptional()
  static: OrderStatus = OrderStatus.PENDING;
  @IsOptional()
  @IsBoolean()
  paid: boolean = false;
}