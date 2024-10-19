import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/updateCompany';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/:id')
  async getCompanyById(@Param('id') id: string) {
    const company = await this.companyService.get(+id);
    console.log(company);
    return { message: 'Successfully retrieved company', results: company };
  }

  @Post('/create')
  async createCompany(@Body() body: CreateCompanyDto) {
    console.log('Company controller ...');
    const company = await this.companyService.create(body);
    return { message: 'Successfully created company', results: company };
  }

  @Patch('/update/:id')
  async updateCompany(@Param('id') id: string, @Body() body: UpdateCompanyDto) {
    const updatedCompany = await this.companyService.update(+id, body);
    return { message: 'Successfully updated company', results: updatedCompany };
  }

  @Delete('/delete/:id')
  async deleteCompany(@Param('id') id: string) {
    const deleteCompany = await this.companyService.delete(+id);
    return { message: 'Successfully deleted company', results: deleteCompany };
  }
}
