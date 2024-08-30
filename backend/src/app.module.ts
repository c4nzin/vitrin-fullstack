import { Module } from '@nestjs/common';
import { EnvalidModule } from 'nestjs-envalid';
import { envalidValidator } from './config/config';
import { DatabaseModule } from './common/database/database.module';
import { LoggerModule } from 'nestjs-pino';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './features/auth/auth.module';
import { BullModule } from './modules/bull/bull.module';
import { OtpModule } from './features/otp/otp.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { AuthenticatedContext } from './common/contexts/authenticated.context';
import { RouterModule } from '@nestjs/core';
import { routes } from './features/routes';

@Module({
  imports: [
    EnvalidModule.forRoot({
      validators: envalidValidator,
      isGlobal: true,
      useDotenv: true,
    }),
    AuthModule,
    UserModule,
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
    OtpModule,
    ThrottlerModule,
    CloudinaryModule,
    RequestContextModule.forRoot({ isGlobal: true, contextClass: AuthenticatedContext }),
    RouterModule.register(routes),
  ],
})
export class AppModule {}
