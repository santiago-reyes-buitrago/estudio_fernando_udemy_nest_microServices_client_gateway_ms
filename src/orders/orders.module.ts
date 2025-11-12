import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { envs, ORDER_MICROSERVICES } from '../config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      { name: ORDER_MICROSERVICES, transport: Transport.TCP, options:{
        host: envs.microservices.order.host,
        port: envs.microservices.order.port,
        } },
    ]),
  ]
})
export class OrdersModule {}
