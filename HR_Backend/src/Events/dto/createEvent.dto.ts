import { IsNotEmpty } from '@nestjs/class-validator';
import { UploadedFiles } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Express } from 'express';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;


  @ApiProperty()
  description: string;



  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;

}
