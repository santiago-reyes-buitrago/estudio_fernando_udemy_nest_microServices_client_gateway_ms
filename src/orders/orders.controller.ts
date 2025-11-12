import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ORDER_MICROSERVICES } from '../config';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_MICROSERVICES) private readonly orderClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('createOrder', {});
  }

  @Get()
  findAll() {
    return this.orderClient.send('findAllOrders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderClient.send('findOneOrder', {id});
  }

  @Patch('changeStatus/:id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderClient.send('changeOrderStatus', {});
  }
}
