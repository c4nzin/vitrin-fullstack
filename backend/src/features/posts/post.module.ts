import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './schemas/post.schema';
import { PostController } from './controllers/post.controller';
import { PostRepository } from './repositories/post.repository';
import { allPostsHandler } from './handler/all-posts.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { CloudinaryModule } from 'src/modules/cloudinary/cloudinary.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    CqrsModule,
    CloudinaryModule,
    UserModule,
  ],
  controllers: [PostController],
  providers: [PostRepository, ...allPostsHandler],
  exports: [PostRepository, ...allPostsHandler],
})
export class PostModule {}
