import { ApiProperty } from '@nestjs/swagger';

export class UpdatePeriodVacation {
  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  status?: string;
}
