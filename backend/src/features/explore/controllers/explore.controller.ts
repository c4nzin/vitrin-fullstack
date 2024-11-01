import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { QueryBus } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';
import { PostDocument } from 'src/features/posts/schemas/post.schema';

@ApiTags('explore')
@Controller('explore')
export class ExploreController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @Message('Sucessfully fetched posts.')
  @HttpCode(HttpStatus.OK)
  public async fetchPosts(): Promise<PostDocument[]> {
    return this.queryBus.execute(new ExploreCommand());
  }
}
