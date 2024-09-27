import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Message, Paginate, User } from 'src/common/decorators';
import { PostDocument, UserDocument } from '../schemas';
import { CreatePostDto } from '../dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TweetPipe } from '../pipes';
import {
  CreateTweetCommand,
  DeleteTweetCommand,
  FetchTweetsCommand,
  LikeTweetCommand,
  UnlikeTweetCommand,
} from '../cqrs';
import { DeleteResult } from 'src/core/repositories/types/query.types';
import { AuthenticatedGuard } from 'src/common/guards';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
import { ApiTags } from '@nestjs/swagger';

@Controller('tweets')
@ApiTags('tweet')
@UseGuards(AuthenticatedGuard)
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @Message('Sucessfully created the tweet.')
  @HttpCode(HttpStatus.CREATED)
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
  @Message('Sucessfully deleted the tweet.')
  @HttpCode(HttpStatus.OK)
  public async deletePost(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<DeleteResult<PostDocument>> {
    return this.commandBus.execute(new DeleteTweetCommand(user, id));
  }

  //change this route to users/userid/tweets
  @Get(':id/tweets')
  @Message('Sucessfully fetched tweets.')
  @HttpCode(HttpStatus.OK)
  public async fetchTweets(
    @Param('id') id: string,
    @Paginate() paginate: Pagination,
  ): Promise<PostDocument[]> {
    return this.queryBus.execute(new FetchTweetsCommand(id, paginate));
  }

  @Post(':id/like')
  @Message('Sucessfully liked the tweet.')
  @HttpCode(HttpStatus.OK)
  public async likeTweet(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<PostDocument> {
    return this.commandBus.execute(new LikeTweetCommand(user, id));
  }

  @Delete(':id/unlike')
  @Message('Sucessfully unliked the tweet.')
  @HttpCode(HttpStatus.OK)
  public async unlikeTweet(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<PostDocument> {
    return this.commandBus.execute(new UnlikeTweetCommand(user, id));
  }
}
