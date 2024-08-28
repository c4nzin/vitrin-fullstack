import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Paginate, User } from 'src/common/decorators';
import { PostDocument, UserDocument } from '../schemas';
import { CreatePostDto } from '../dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TweetPipe } from '../pipes';
import {
  CreateTweetCommand,
  DeleteTweetCommand,
  FetchTweetsCommand,
  LikeTweetCommand,
} from '../cqrs';
import { DeleteResult } from 'src/core/repositories/types/query.types';
import { AuthenticatedGuard } from 'src/common/guards';
import { Pagination } from 'src/common/decorators/types/pagination.interface';

@Controller('tweets')
@UseGuards(AuthenticatedGuard)
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async createPost(
    @User() user: UserDocument,
    @Body() createPost: CreatePostDto,
    @UploadedFile(TweetPipe) uploadedMedia?: Express.Multer.File,
  ): Promise<PostDocument> {
    return this.commandBus.execute(
      new CreateTweetCommand(user, createPost, uploadedMedia),
    );
  }

  @Delete(':id')
  public async deletePost(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<DeleteResult<PostDocument>> {
    return this.commandBus.execute(new DeleteTweetCommand(user, id));
  }

  //change this route to users/userid/tweets
  @Get(':id/tweets')
  public async fetchTweets(
    @Param('id') id: string,
    @Paginate() paginate: Pagination,
  ): Promise<PostDocument[]> {
    return this.commandBus.execute(new FetchTweetsCommand(id, paginate));
  }

  @Post(':id/like')
  public async likeTweet(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<PostDocument> {
    return this.commandBus.execute(new LikeTweetCommand(user, id));
  }
}
