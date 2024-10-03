import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { allAccountHandlers } from './handler/all-account.handlers';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CqrsModule,
    CloudinaryModule,
    NotificationModule,
  ],
  providers: [...allAccountHandlers],
  exports: [...allAccountHandlers],
})
export class AccountModule {}
