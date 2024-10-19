import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty()
  street: string;

  @ApiProperty()
  number: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @IsEmpty()
  employee_id?: number;
}
