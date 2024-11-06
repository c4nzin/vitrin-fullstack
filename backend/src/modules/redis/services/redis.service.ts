import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore) {}

  public async get(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  public async set(key: string, value: any, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  public async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }
}
