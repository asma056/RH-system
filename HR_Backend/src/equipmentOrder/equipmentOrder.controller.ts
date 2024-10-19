import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EquipmentOrderService } from './equipmentOrder.service';
import { CreateEquipmentOrderDto } from './dto/createEquipmentOrder.dto';
import { CreateReturnOrderDto } from './dto/createReturnOrder.dto';
import { UpdateEquipmentOrderDto } from './dto/updateEquipmentOrder.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('equipmentOrder')
@Controller('equipment/order')
export class EquipmentOrderController {
  constructor(private equipmentOrderService: EquipmentOrderService) {}

  @Get('/all')
  async getAllOrders() {
    const orders = await this.equipmentOrderService.getAllOrders();
    return {
      message: 'Successfully returned all orders',
      results: orders.data,
    };
  }

  @Get('/:id')
  async getOrderById(@Param('id') id: string) {
    const orders = await this.equipmentOrderService.getOrderById(+id);
    if (!orders) {
      throw new HttpException('Failed to get equipment', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Successfully retrieved order',
      results: orders.data,
    };
  }

  @ApiConsumes('multipart/form-data')
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createEquipmentOrder(@UploadedFile() file: Express.Multer.File, @Body() body: CreateEquipmentOrderDto) {
    const order = await this.equipmentOrderService.create(body,file);
    if (order.error) {
      return new HttpException(
        'Failed to create order',
        HttpStatus.NOT_MODIFIED,
      );
    }
    return { message: 'Order created successfully', results: order.data };
  }

  @Patch('return')
  async returnEquipmentOrder(@Body() body: CreateReturnOrderDto) {
    const order = await this.equipmentOrderService.returnOrder(body);
    if (order.error) {
      return new HttpException('Failed to return order', HttpStatus.NO_CONTENT);
    }
    return { message: 'Order returned successfully', results: order.data };
  }

  @Patch('update/:id')
  async updateEquipmentOrder(
    @Body() body: UpdateEquipmentOrderDto,
    @Param('id') id: string,
  ) {
    const order = await this.equipmentOrderService.update(body, +id);
    return { message: 'Successfully updated order', result: order.data };
  }
}
