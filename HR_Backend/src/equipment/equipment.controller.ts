import {
  Body,
  Controller,
  Post,
  Param,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/createEquipment.dto';
import { UpdateEquipmentDto } from './dto/updateEquipment.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/decorators/roles.decorators';
import { Roles } from '@prisma/client';

@ApiTags('equipment')
//@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('/equipment')
export class EquipmentController {
  constructor(private equipmentService: EquipmentService) {}

  @Get('/all')
  async getAllEquipment() {
    console.log('*')
    const equipment = await this.equipmentService.getAllEquipement();
    if (!equipment) {
      throw new HttpException('Failed to get equipment', HttpStatus.NOT_FOUND);
    }
    return { message: 'Successfully retrieved equipment', results: equipment };
  }

  @Get('/:id')
  async getEquipment(@Param('id') id: string) {
    const equipment = await this.equipmentService.getById(+id);
    if (!equipment) {
      throw new HttpException('Failed to get equipment', HttpStatus.NOT_FOUND);
    }
    return { message: 'Successfully retrieved equipment', results: equipment };
  }


  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Post('/create')
  async createEquipmentOrder(@Body() body: CreateEquipmentDto) {
    const equipment = await this.equipmentService.create(body);
    if (!equipment) {
      throw new HttpException(
        'Failed to create equipment',
        HttpStatus.NOT_MODIFIED,
      );
    }
    return { message: 'Successfully created equipment', results: equipment };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Patch('/update/:id')
  async updateEquipment(
    @Body() body: UpdateEquipmentDto,
    @Param('id') id: string,
  ) {
    const updatedEquipment = await this.equipmentService.update(body, +id);
    if (!updatedEquipment) {
      throw new HttpException(
        'Failed to update equipment',
        HttpStatus.NOT_MODIFIED,
      );
    }
    return {
      message: 'Successfully updated equipment',
      results: updatedEquipment,
    };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Delete('/:id')
  async deleteEquipment(@Param('id') id: string,
) {
    const deletedEquipment = await this.equipmentService.delete(+id);
    if (!deletedEquipment) {
      throw new HttpException(
        'Failed to delete equipment',
        HttpStatus.NOT_MODIFIED,
      );
    }
    return {
      message: 'Successfully deleted equipment',
      results: deletedEquipment,
    };
  }
}
