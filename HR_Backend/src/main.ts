import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
  });

  const config = new DocumentBuilder()
    .setTitle('HR System')
    .setVersion('1.0')
    .addTag('address')
    .addTag('auth')
    .addTag('company')
    .addTag('documentation')
    .addTag('employee')
    .addTag('equipment')
    .addTag('equipmentOrder')
    .addTag('user')
    .addTag('events')
    .addTag('alerts')
    .addTag('vacation')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
