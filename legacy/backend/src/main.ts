import { NestFactory } from '@nestjs/core';
import { setupApp } from './setup-app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Config, ENV } from './config/config';
import { setupSwagger } from './setup-swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<Config>(ENV);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  setupSwagger(app);
  await setupApp(app);

  await app.listen(config.PORT);
}
bootstrap();
