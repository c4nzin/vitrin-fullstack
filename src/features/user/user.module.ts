import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/';
import { PhotoController, UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { UploadPhotoCommandHandler } from './cqrs/photo/handler/upload-photo.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommandHandler } from './cqrs/account/handler/update-profile.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CloudinaryModule,
    CqrsModule,
  ],
  controllers: [PhotoController, UserController],
  providers: [
    UserRepository,
    UploadPhotoCommandHandler,
    UpdateProfileFieldsCommandHandler,
  ],
  exports: [UserRepository, UploadPhotoCommandHandler, UpdateProfileFieldsCommandHandler],
})
export class UserModule {}
