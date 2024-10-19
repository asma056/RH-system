import { ApiProperty } from '@nestjs/swagger';

export class CreateReturnOrderDto {
  @ApiProperty()
  id: number;
}
