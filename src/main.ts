import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}

bootstrap()
  .then(() => {
    console.log('started');
  })
  .catch((e) => {
    console.error({ e });
  });
