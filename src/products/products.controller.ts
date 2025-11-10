import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_MICROSERVICES } from '../config';
import { PaginationDto } from '../common';
import { catchError, firstValueFrom } from 'rxjs';
import { UpdateProductDto } from './dto/update-product.dto';
import {CreateProductDto} from "./dto/create-product.dto";

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_MICROSERVICES) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
      return this.productClient.send(
          { cmd: 'create' },
          { ...createProductDto },
      );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productClient.send(
      { cmd: 'find_all' },
      { page: paginationDto.page, limit: paginationDto.limit },
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'find_by_id' }, { id }).pipe(
      catchError((e) => {
        console.log(e);
        throw new RpcException(e);
        // throw new BadRequestException('Product not found');
      }),
    );
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProductDto) {
    return this.productClient.send(
      { cmd: 'update_product' },
      { id, updateProductDto: updateDto },
    );
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productClient.send({ cmd: 'delete_product' }, { id });
  }
}
