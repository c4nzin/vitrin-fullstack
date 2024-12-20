import { Module } from '@nestjs/common';
import { EnvalidModule } from 'nestjs-envalid';
import { envalidValidator } from './config/config';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './features/auth/auth.module';
import { BullModule } from './modules/bull/bull.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AuthenticatedContext } from './common/contexts/authenticated.context';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { ThrottlerModule } from './modules/throttler/throttler.module';
import { FeaturesModule } from './features/features.module';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisModule } from './modules/redis/redis.module';
import { HttpModule } from './modules/http/http.module';

@Module({
  imports: [
    FeaturesModule,
    EnvalidModule.forRoot({
      validators: envalidValidator,
      isGlobal: true,
      useDotenv: true,
    }),
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            destination: './logs/app.log',
            mkdir: true,
            colorize: true,
          },
        },
        level: 'info',
      },
    }),
    DatabaseModule,
    BullModule,
    ThrottlerModule,
    CloudinaryModule,
    RequestContextModule.forRoot({ isGlobal: true, contextClass: AuthenticatedContext }),
    WebsocketModule,
    RedisModule,
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [],
})
export class AppModule {}
