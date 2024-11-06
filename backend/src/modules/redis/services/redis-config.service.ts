import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import * as redisStore from 'cache-manager-redis-store';
import type { IRedisCacheOptions } from 'src/modules/redis/interfaces/redis-cache.options';

@Injectable()
export class RedisConfigService implements CacheOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public createCacheOptions(): CacheModuleOptions<IRedisCacheOptions> {
    return {
      isGlobal: true,
      store: redisStore,
      host: this.config.REDIS_HOST,
      port: this.config.REDIS_PORT,
    };
  }
}
