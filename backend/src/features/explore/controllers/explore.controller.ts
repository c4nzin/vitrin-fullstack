import { Controller, Get, HttpCode, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Message } from 'src/common/decorators';
import { PostDocument } from 'src/features/posts/schemas/post.schema';
import { AuthenticatedGuard } from 'src/common/guards';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { EXPLORE_CACHE_KEY } from '../constants';
import { QueryBus } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';

@ApiTags('explore')
@Controller('explore')
@UseGuards(AuthenticatedGuard)
export class ExploreController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @Message('Sucessfully fetched posts.')
  @HttpCode(HttpStatus.OK)
  public async fetchPosts(): Promise<PostDocument[]> {
    const cachedPosts = await this.cacheManager.get<PostDocument[]>(EXPLORE_CACHE_KEY);

    if (cachedPosts) {
      return cachedPosts;
    }

    //bu yapı biraz mantıksız geldi incele.
    const posts = await this.queryBus.execute(new ExploreCommand());

    await this.cacheManager.set(EXPLORE_CACHE_KEY, posts, 600);

    return posts;
  }
}
