import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ExploreCommandHandler } from '../handler/explore-command.handler';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EXPLORE_CACHE_KEY } from '../constants';

@Injectable()
export class ExploreCronService {
  private logger = new Logger(ExploreCronService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly exploreCronCommandHandler: ExploreCommandHandler,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async updateExploreCache(): Promise<void> {
    this.logger.log(
      'Executing the explore cron job to update the explore cache periodically.',
    );

    const posts = await this.exploreCronCommandHandler.execute();

    await this.cacheManager.set(EXPLORE_CACHE_KEY, posts, 600000);
  }
}
