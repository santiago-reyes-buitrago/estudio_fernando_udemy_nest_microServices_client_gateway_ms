import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_MICROSERVICES } from '../config';

@Module({
  imports: [
    ClientsModule.register([
      { name: PRODUCT_MICROSERVICES, transport: Transport.TCP, options:{
        host: envs.microservices.product.host,
        port: envs.microservices.product.port,
        } },
    ]),
  ],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
