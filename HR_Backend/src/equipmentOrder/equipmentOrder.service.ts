import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateEquipmentOrderDto } from './dto/createEquipmentOrder.dto';
import { CreateReturnOrderDto } from './dto/createReturnOrder.dto';
import { UpdateEquipmentOrderDto } from './dto/updateEquipmentOrder.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class EquipmentOrderService {
  constructor(private prisma: PrismaService,private s3Service: S3Service) {}

  async getAllOrders() {
    const order = await this.prisma.equipmentOrder.findMany({
      include:{
        equipment:{
          select : {
            name : true
          }
        }
      }
    });
    return { error: false, data: order };
  }

  async getOrderById(id : number) {
    const order = await this.prisma.equipmentOrder.findUnique({
      where: { id },
    });
    return { error: false, data: order };
  }

  async returnOrder(body: CreateReturnOrderDto) {
    const returnedOrder = await this.prisma.equipmentOrder.update({
      where: { id: body.id },
      data: {
        returnDate: new Date(),
        equipment: { update: { isInOrder: false } },
      },
    });
    return { error: false, data: returnedOrder };
  }

  async create(body: CreateEquipmentOrderDto,file: Express.Multer.File) {
    const { equipmentId, ...data } = body;
    const { fieldname, originalname, mimetype } = file;
    const document = await this.s3Service.uploadFile(
        file,
      `${fieldname}/${originalname}`,
    );


    const isInOrderEquipment = await this.prisma.equipment.findUnique({
      where: { id: Number(equipmentId) },
    });

    if (isInOrderEquipment.isInOrder) {
      return { error: true };
    }
    const {employeeId,name,deliveryDate,observation} = data ;
    const createdOrder = await this.prisma.equipment.update({
      where: { id: Number(equipmentId) },
      data: { 
        isInOrder: true, 
        order: { 
          create: [{ 
            employeeId: Number(employeeId), 
            name: name,
            deliveryDate: new Date(deliveryDate), 
            returnDate: null,
            observation: observation,
            document: document
          }] 
        } 
      },
    });
    

    return { error: false, data: createdOrder };
  }

  async update(body: UpdateEquipmentOrderDto, id: number) {
    const order = await this.prisma.equipmentOrder.update({
      where: { id },
      data: { ...body },
    });

    return { error: false, data: order };
  }
}
