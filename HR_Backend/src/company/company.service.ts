import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}
  async create(body: CreateCompanyDto) {
    const { name, phone, cnpj } = body;
    const company = await this.prisma.company.create({
      data: {
        name,
        phone,
        cnpj,
      },
    });
    return company;
  }

  async update(id: number, body: UpdateCompanyDto) {
    const { name, phone, cnpj } = body;
    const company = await this.prisma.company.update({
      where: { id },
      data: {
        name,
        phone,
        cnpj,
      },
    });

    return company;
  }
  async get(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    return company;
  }
  async delete(id: number) {
    const company = await this.prisma.company.delete({
      where: { id },
    });
    return company;
  }
}
