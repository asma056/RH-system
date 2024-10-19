import { ApiProperty } from '@nestjs/swagger';

enum Roles {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',

}
export class UpdateUserDto {
  password?: string;

  refreshToken?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  role?: Roles;
}
