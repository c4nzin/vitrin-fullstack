import { VerifyAccountCommandHandler } from 'src/features/auth/handler/verify-account.handler';
import { GenerateOtpHandler } from './generate-otp.handler';

export const allOtpHandlers = [GenerateOtpHandler, VerifyAccountCommandHandler];
