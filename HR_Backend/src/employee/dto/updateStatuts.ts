import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatutsDto {
  @ApiProperty()
  @IsNotEmpty()
  active: boolean;

}
