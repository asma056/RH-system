import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601 } from 'class-validator';

import { CreateAddressDto } from 'src/address/dto/createAdress.dto';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsISO8601({
    strict: true,
  })
  dateOfBirth: string;

  @ApiProperty()
  position?: string;

  @ApiProperty()
  level?: string;

  @ApiProperty()
  @IsNotEmpty()
  rg: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  uf: string;

  @ApiProperty()
  @IsNotEmpty()
  emissionAgency: string;

  @ApiProperty()
  @IsNotEmpty()
  emissionDate: string;

  @ApiProperty()
  @IsNotEmpty()
  mothersName: string;

  @ApiProperty()
  @IsNotEmpty()
  jobFormat: string;

  @ApiProperty()
  @IsNotEmpty()
  admissionDate: string;

  @ApiProperty()
  pisNumber: string;

  @ApiProperty()
  personalEmail?: string;

  @ApiProperty()
  corporateEmail?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  notes?: string;


  @ApiProperty()
  salaire?: string;

  @ApiProperty()
  address?: CreateAddressDto;

  refresh_token?: string;

}
