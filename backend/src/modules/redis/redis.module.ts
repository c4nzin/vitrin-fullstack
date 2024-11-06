import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { RedisConfigService } from './services/redis-config.service';
import { RedisService } from './services/redis.service';

@Global()
@Module({
  imports: [CacheModule.registerAsync({ useClass: RedisConfigService, isGlobal: true })],
  providers: [RedisConfigService, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
