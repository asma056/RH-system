import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateAddressDto } from './dto/createAdress.dto';
import { updateAddressDto } from './dto/updateAddress.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createAddress(body: CreateAddressDto) {
    // employee_id: number
    // const {employee_id, ...address} = body;
    const { street, number, neighborhood, city, state, employee_id, cep } =
      body;
    const address = await this.prisma.address.create({
      data: {
        street,
        number,
        neighborhood,
        city,
        cep,
        state,
        Employee: { connect: { id: employee_id } },
      },
    });

    return address;
  }
  async updateAddress(body: updateAddressDto, id: number) {
    const address = await this.prisma.address.update({
      where: { id },
      data: body,
    });
    console.log('Updated address', address);
    return address;
  }
  async deleteAddress(id: number) {
    const address = await this.prisma.address.delete({
      where: { id },
    });
    return address;
  }
  async getAddress(id: number) {
    const address = await this.prisma.address.findUnique({
      where: { id },
    });
    return address;
  }
}
