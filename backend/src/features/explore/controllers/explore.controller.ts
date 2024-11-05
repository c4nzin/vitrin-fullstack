import { Controller, Get, HttpCode, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EXPLORE_CACHE_KEY } from '../constants';
import { AuthenticatedGuard } from 'src/common/guards';

@ApiTags('explore')
@Controller('explore')
@UseGuards(AuthenticatedGuard)
export class ExploreController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get()
  @Message('Sucessfully fetched posts.')
  @HttpCode(HttpStatus.OK)
  public async fetchPosts(): Promise<any> {
    return this.cacheManager.get(EXPLORE_CACHE_KEY);
  }
}
