import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV, Config } from './config/config';
import { name, version } from '../package.json';

export function setupSwagger(app: NestExpressApplication): void {
  const config = app.get<Config>(ENV);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(name)
    .setVersion(version)
    .setDescription('Nexus api official documentation')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document);
  SwaggerModule.setup(config.GLOBAL_PREFIX, app, document);
}
