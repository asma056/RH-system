import { ApiProperty } from '@nestjs/swagger';
import { VacationStatus } from './createVacationPeriod.dto';

export class UpdateVacationStatus {
  @ApiProperty()
  status: VacationStatus;
}
