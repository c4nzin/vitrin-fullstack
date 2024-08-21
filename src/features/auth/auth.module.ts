import { Module } from '@nestjs/common';
import { SessionSerializer } from './serializer/session.serializer';
import { AuthController } from './controllers';
import { AuthService } from './services';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [SessionSerializer, AuthService, LocalStrategy],
})
export class AuthModule {}
