import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Patch,
    Post,
    Delete,
    UseGuards,
    UploadedFile, UseInterceptors,
    UploadedFiles
  } from '@nestjs/common';
  import { Roles } from '@prisma/client';
  import { Role } from '../common/decorators/roles.decorators';
  import { CreateEventDto } from './dto/createEvent.dto';
  import { EventService } from './events.service';
  import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
  import { RolesGuard } from 'src/common/guards/roles.guard';
  import { FileInterceptor } from '@nestjs/platform-express';

  @ApiTags('events')
  @Controller('events')
  //@UseGuards(AccessTokenGuard, RolesGuard)
  export class EventController {
    constructor(private eventService: EventService) {}
  

  @Get('/all')
  async getAllEvents(){
    const events = await this.eventService.getAll();
    return { message: 'Successfully retrieved event', results: events};
  }

  @Post('/create')
  async createEvent(@Body() body: CreateEventDto ) {
    const event = await this.eventService.create(body);
    return { message: 'Successfully created event', results: event };
  }


  @Delete('/delete/:id')
  async deleteEvent(@Param('id') id: string) {
    const deleteEvent = await this.eventService.delete(+id);
    return { message: 'Successfully deleted event', results: deleteEvent };
  }


  }