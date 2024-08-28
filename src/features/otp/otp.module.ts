import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OTP, OtpSchema } from './schemas/otp.schema';
import { OtpRepository } from './repositories/otp.repository';
import { OtpController } from './controllers';
import { UserModule } from '../user/user.module';
import { GenerateOtpHandler } from './cqrs/generate-otp/handler/generate-otp.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { VerifyOtpHandler } from './cqrs/verify-otp/handler/verify-otp.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OTP.name, schema: OtpSchema }]),
    UserModule,
    CqrsModule,
  ],
  providers: [OtpRepository, GenerateOtpHandler, VerifyOtpHandler],
  controllers: [OtpController],
  exports: [OtpRepository, GenerateOtpHandler, VerifyOtpHandler],
})
export class OtpModule {}
