import { NestFactory } from '@nestjs/core';
import { setupApp } from './setup-app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Config, ENV } from './config/config';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<Config>(ENV);
  setupSwagger(app);
  setupApp(app);
  //TODO : ADD GUARDS TO REGISTER/LOGIN
  //TODO : ADD GOOGLE LOGIN
  //TODO : ADD ESSENTIAL MIDDLEWARES HELMET COMPRESSION ETC
  //TODO : ADD BULLMQ
  //TODO : ADD MAIL SERVICE
  //TODO : ADD OTP
  //TODO : ADD THROTTLER
  //TODO : ADD PINO PRETTIER
  //TODO : ADD CLOUD STORAGE
  //TODO : ADD IS USER FIELD IS UNQIUE DECORATOR WITH CLASS VALIDATOR

  await app.listen(config.PORT);
}
bootstrap();
