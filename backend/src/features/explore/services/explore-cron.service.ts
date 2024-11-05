import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ExploreCommandHandler } from '../handler/explore-command.handler';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EXPLORE_CACHE_KEY } from '../constants';

@Injectable()
export class ExploreCronService {
  private logger = new Logger('CronJob');
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly exploreCronCommandHandler: ExploreCommandHandler,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async updateExploreCache(): Promise<void> {
    this.logger.log('Explore cronjob to update posts cache.');

    const posts = await this.exploreCronCommandHandler.execute();

    await this.cacheManager.set(EXPLORE_CACHE_KEY, posts, 3600);
  }
}