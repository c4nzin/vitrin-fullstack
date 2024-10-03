import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { allHandlers } from '../user/cqrs/all-handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => UserModule), CqrsModule, CloudinaryModule],
  providers: [...allHandlers],
  exports: [...allHandlers],
})
export class AccountModule {}
