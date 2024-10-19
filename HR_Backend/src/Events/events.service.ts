import { Injectable } from '@nestjs/common';
import {
  addYears,
  differenceInCalendarYears,
  differenceInMonths,
} from 'date-fns';
import { PrismaService } from 'src/service/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateEventDto } from './dto/createEvent.dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService,private s3Service: S3Service) {}


    async getAll() {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const events = await this.prisma.events.findMany();
      
      // Filtrer les événements pour ne garder que ceux qui se produisent après la date actuelle
      const upcomingEvents = events.filter(event => {
        return event.date.getDate() >= currentDate.getDate();
      })
    
      return upcomingEvents;
    }
    

      async create(body: CreateEventDto)  {
        const { name, date, time,description } = body;
            const event = await this.prisma.events.create({
                data: {
                    name,
                    description,
                    date: new Date(date),
                    time,
                  },
            
            })

            return event ;
          
      }
 

      async delete(id: number) {
        const event = await this.prisma.events.delete({
          where: { id },
        });
        return event;
      }
    
    
    


}