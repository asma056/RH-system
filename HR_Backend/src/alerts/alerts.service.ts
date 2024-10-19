import { Injectable } from '@nestjs/common';
import {
  addYears,
  differenceInCalendarYears,
  differenceInMonths,
} from 'date-fns';
import { PrismaService } from 'src/service/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateEventDto } from './dto/createAlerts.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class AlertsService {
    constructor(private prisma: PrismaService,private s3Service: S3Service) {}


    async getAll() {
      const alerts = await this.prisma.alerts.findMany();
    
      return alerts;
    }
    

      async create(body: CreateEventDto)  {
        const { name,description } = body;
            const alert = await this.prisma.alerts.create({
                data: {
                    name,
                    description,
                  },
            
            })

            return alert ;
          
      }
 

      async delete(id: number) {
        const alert = await this.prisma.alerts.delete({
          where: { id },
        });
        return alert;
      }
    
    
    


}