import { Module } from '@nestjs/common';
import { RedisConfigFactory } from './services/redis-config.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.registerAsync({ useClass: RedisConfigFactory })],
})
export class RedisModule {}
