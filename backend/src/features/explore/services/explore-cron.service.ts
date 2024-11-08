import { Injectable, Logger } from '@nestjs/common';
import { ExploreQueryHandler } from '../handler/explore-query.handler';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EXPLORE_CACHE_KEY } from '../constants';
import { RedisService } from 'src/modules/redis/services/redis.service';

@Injectable()
export class ExploreCronService {
  private logger = new Logger(ExploreCronService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly exploreCronHandler: ExploreQueryHandler,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async updateExploreCache(): Promise<void> {
    this.logger.log(
      'Executing the explore cron job to update the explore cache periodically.',
    );

    const posts = await this.exploreCronHandler.execute();

    await this.redisService.set(EXPLORE_CACHE_KEY, posts, 600000);
  }
}
