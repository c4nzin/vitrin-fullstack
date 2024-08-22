import { Module } from '@nestjs/common';
import { UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
