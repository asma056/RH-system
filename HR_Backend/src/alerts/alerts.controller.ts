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
  import { CreateEventDto } from './dto/createAlerts.dto';
  import { AlertsService } from './alerts.service';
  import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
  import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
  import { RolesGuard } from 'src/common/guards/roles.guard';
  import { FileInterceptor } from '@nestjs/platform-express';

  @ApiTags('alerts')
  @Controller('alerts')
  //@UseGuards(AccessTokenGuard, RolesGuard)
  export class AlertsController {
    constructor(private alertsService: AlertsService) {}
  

  @Get('/all')
  async getAllAlerts(){
    const events = await this.alertsService.getAll();
    return { message: 'Successfully retrieved alerts', results: events};
  }

  @Post('/create')
  async createAlert(@Body() body: CreateEventDto ) {
    const event = await this.alertsService.create(body);
    return { message: 'Successfully created alert', results: event };
  }


  @Delete('/delete/:id')
  async deleteAlert(@Param('id') id: string) {
    const deleteEvent = await this.alertsService.delete(+id);
    return { message: 'Successfully deleted alert', results: deleteEvent };
  }


  }