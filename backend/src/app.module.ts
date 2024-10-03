import { Module } from '@nestjs/common';
import { EnvalidModule } from 'nestjs-envalid';
import { envalidValidator } from './config/config';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { BullModule } from './modules/bull/bull.module';
import { OtpModule } from './features/otp/otp.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AuthenticatedContext } from './common/contexts/authenticated.context';
import routes from './features/routes';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { ThrottlerModule } from './modules/throttler/throttler.module';
import { RouterModule } from '@nestjs/core';
import { AccountModule } from './features/account/account.module';
import { FollowModule } from './features/follow/follow.module';
import { FriendModule } from './features/friend/friend.module';
import { NotificationModule } from './features/notification/notification.module';

@Module({
  imports: [
    UserModule,
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
    FriendModule,
    NotificationModule,
    AccountModule,
    BullModule,
    OtpModule,
    ThrottlerModule,
    CloudinaryModule,
    RequestContextModule.forRoot({ isGlobal: true, contextClass: AuthenticatedContext }),
    RouterModule.register(routes),
    WebsocketModule,
    AccountModule,
    FollowModule,
  ],
  providers: [],
})
export class AppModule {}
