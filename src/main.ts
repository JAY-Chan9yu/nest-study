import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serverConfifg = config.get('server');
  const port = serverConfifg.port;
  await app.listen(port);
  Logger.log(`application running on port ${port}`);
}
bootstrap();
