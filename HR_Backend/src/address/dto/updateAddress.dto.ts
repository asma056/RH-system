import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class updateAddressDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  street: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  @IsNumber()
  number: string;

  @ApiProperty()
  neighborhood: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}
