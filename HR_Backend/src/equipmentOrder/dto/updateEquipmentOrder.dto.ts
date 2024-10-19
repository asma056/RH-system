import { ApiProperty } from '@nestjs/swagger';

export class UpdateEquipmentOrderDto {
  @ApiProperty()
  deliveryDate: Date;

  @ApiProperty()
  observation: string;
}
