import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { UserModule } from './user/user.module';

export default [
  {
    path: 'users',
    module: UserModule,
  },
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'auth',
    module: OtpModule,
  },
];
