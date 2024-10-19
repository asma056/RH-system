import { ApiProperty } from '@nestjs/swagger';

export enum VacationStatus {
  WAITING_APPROVE = 'WAITING_APPROVE',
  SENT_TO_ACCOUNTING = 'SENT_TO_ACCOUNTING',
  PENDING_SIGN = 'PENDING_SIGN',
  APPROVED = 'APPROVED',
}

export class CreatePeriodVacation {
  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  status: VacationStatus;
}
