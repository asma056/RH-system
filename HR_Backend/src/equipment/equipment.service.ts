import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateEquipmentDto } from './dto/createEquipment.dto';
import { UpdateEquipmentDto } from './dto/updateEquipment.dto';

@Injectable()
export class EquipmentService {
  constructor(private prisma: PrismaService) {}

  async getAllEquipement() {
    const equipment = await this.prisma.equipment.findMany();
    return equipment;
  }

  async getById(id: number) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    return equipment;
  }

  async create(body: CreateEquipmentDto) {
    const { name,description } = body;
    const createdEquipment = await this.prisma.equipment.create({
      data: { name,description }
    });

    return createdEquipment;
  }

  async update(body: UpdateEquipmentDto, id: number) {
    const { name,description } = body;
    const updatedEquipment = await this.prisma.equipment.update({
      where: { id },
      data: { name,description },
    });
    return updatedEquipment;
  }

  async delete(id: number) {
    const deletedEquipment = await this.prisma.equipment.delete({
      where: { id },
    });

    return deletedEquipment;
  }
}
