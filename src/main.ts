import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // habilitamos CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true
  })

  // Aplicamos validaciçon global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(4000);
  console.log('API de gastos corriendo en http://localhost:4000/api')
}
bootstrap();
