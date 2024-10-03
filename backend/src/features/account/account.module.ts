import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { allAccountHandlers } from './handler/all-account.handlers';
import { NotificationModule } from '../notification/notification.module';
import { AccountController } from './controllers/account.controller';
import { PhotoController } from './controllers/photo.controller';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CqrsModule,
    CloudinaryModule,
    NotificationModule,
  ],
  controllers: [AccountController, PhotoController],
  providers: [...allAccountHandlers],
  exports: [...allAccountHandlers],
})
export class AccountModule {}
