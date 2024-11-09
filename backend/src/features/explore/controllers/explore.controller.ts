import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { AuthenticatedGuard } from 'src/common/guards';
import { QueryBus } from '@nestjs/cqrs';
import { ExploreQuery } from '../fetch-explore/explore.query';

@ApiTags('explore')
@Controller('explore')
@UseGuards(AuthenticatedGuard)
export class ExploreController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Message('Sucessfully fetched posts.')
  @HttpCode(HttpStatus.OK)
  public async fetchPosts(): Promise<any> {
    return this.queryBus.execute(new ExploreQuery());
  }
}
