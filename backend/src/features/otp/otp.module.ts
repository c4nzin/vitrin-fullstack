import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OtpSchema } from './schemas/otp.schema';
import { OtpRepository } from './repositories/otp.repository';
import { OtpController } from './controllers';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { allOtpHandlers } from './handler/all-otp.handlers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP.name, schema: OtpSchema }]),
    UserModule,
    CqrsModule,
  ],
  controllers: [OtpController],
  providers: [OtpRepository, ...allOtpHandlers],
  exports: [OtpRepository, ...allOtpHandlers],
})
export class OtpModule {}
