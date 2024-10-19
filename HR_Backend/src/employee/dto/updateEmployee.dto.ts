import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  position?: string;

  @ApiProperty()
  level?: string;

  @ApiProperty()
  @IsNotEmpty()
  jobFormat: string;

  @ApiProperty()
  @IsNotEmpty()
  admissionDate: string;

  @ApiProperty()
  pisNumber: string;


  @ApiProperty()
  phone?: string;

  @ApiProperty()
  notes?: string;

  @ApiProperty()
  salaire?: string;


}
