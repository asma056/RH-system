import { ApiProperty } from '@nestjs/swagger';

export class CreateEquipmentOrderDto {
  @ApiProperty()
  employeeId: number;

  @ApiProperty()
  equipmentId: number;

  @ApiProperty()
  name: string;


  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  returnDate: Date | null;


  @ApiProperty()
  observation: string;

}
