import { Module } from '@nestjs/common';
import { PostRepository, UserRepository } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema, User, UserSchema } from './schemas/';
import { PhotoController, UserController } from './controllers';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { CqrsModule } from '@nestjs/cqrs';
import { FollowController } from './controllers/follow.controller';
import { allHandlers } from './cqrs/all-handlers';
import { PostController } from './controllers/post.controller';
import { FriendRequest, FriendRequestSchema } from './schemas/friend-request.schema';
import { FriendRequestRepository } from './repositories/friend-request.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
      { name: FriendRequest.name, schema: FriendRequestSchema },
    ]),
    CloudinaryModule,
    CqrsModule,
  ],
  controllers: [PhotoController, UserController, FollowController, PostController],
  providers: [FriendRequestRepository, UserRepository, PostRepository, ...allHandlers],
  exports: [FriendRequestRepository, UserRepository, PostRepository, ...allHandlers],
})
export class UserModule {}
