import { ApiProperty } from '@nestjs/swagger';

export class UpdateEquipmentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  
}
