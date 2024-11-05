import { CacheOptionsFactory } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import { IRedisCacheOptions } from 'src/modules/cron/interfaces';
import * as redisStore from 'cache-manager-redis-store';

@Injectable()
export class CronConfigFactory implements CacheOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public async createCacheOptions(): Promise<IRedisCacheOptions> {
    return {
      host: this.config.REDIS_HOST,
      port: this.config.REDIS_PORT,
      store: redisStore,
      isGlobal: true,
    };
  }
}
