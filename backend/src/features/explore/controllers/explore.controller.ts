import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { ExploreDocument } from '../schemas/explore.schema';
import { QueryBus } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';

@ApiTags('explore')
@Controller('explore')
export class ExploreController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @Message('Sucessfully fetched posts.')
  @HttpCode(HttpStatus.OK)
  public async fetchPosts(
    @Query('limit') limit: number = 30,
  ): Promise<ExploreDocument[]> {
    return this.queryBus.execute(new ExploreCommand(limit));
  }
}
