import { CacheModuleOptions, CacheStore, CacheStoreFactory } from '@nestjs/cache-manager';

export interface IRedisCacheOptions extends CacheModuleOptions {
  host: string;
  port: number;
  password?: string;
  db?: number;
  isGlobal: boolean;
  store: string | CacheStoreFactory | CacheStore;
  isCacheableValue?: (value: any) => boolean;
  max?: number;
  ttl?: number;
}
