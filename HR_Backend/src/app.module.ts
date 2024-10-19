import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { EmployeeModule } from './employee/employee.module';
import { VacationModule } from './vacation/vacation.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DocumentModule } from './documentation/documentation.module';
import { EquipmentModule } from './equipment/equipment.module';
import { EquipmentOrderModule } from './equipmentOrder/equipmentOrder.module';
import { EventsModule } from './Events/events.module';
import { AlertsModule } from './alerts/alerts.module';


@Module({
  imports: [
    CompanyModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    AddressModule,
    EmployeeModule,
    VacationModule,
    ScheduleModule.forRoot(),
    DocumentModule,
    EquipmentModule,
    EquipmentOrderModule,
    EventsModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
