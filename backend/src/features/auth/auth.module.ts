import { Module } from '@nestjs/common';
import { SessionSerializer } from './serializer/session.serializer';
import { AuthController } from './controllers';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthProfile } from './profiles/auth.profile';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { BullModule } from '@nestjs/bull';
import { EMAIL_QUEUE } from 'src/modules/email/services';
import { OtpModule } from '../otp/otp.module';
import { IsFieldUniqueConstraint } from 'src/common/decorators';
import { allAuthHandlers } from './handler/all-auth.handlers';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    CqrsModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    BullModule.registerQueue({ name: EMAIL_QUEUE }),
    OtpModule,
  ],
  controllers: [AuthController],
  providers: [
    SessionSerializer,
    LocalStrategy,
    AuthProfile,
    IsFieldUniqueConstraint,
    ...allAuthHandlers,
  ],
  exports: [...allAuthHandlers],
})
export class AuthModule {}
