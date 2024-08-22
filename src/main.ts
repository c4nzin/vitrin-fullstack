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
  setupApp(app);
  //TODO : ADD GOOGLE LOGIN
  //TODO : ADD MAIL SERVICE
  //TODO : ADD THROTTLER
  //TODO : ADD CLOUD STORAGE
  //TODO : ADD IS USER FIELD IS UNQIUE DECORATOR WITH CLASS VALIDATOR

  await app.listen(config.PORT);
}
bootstrap();
