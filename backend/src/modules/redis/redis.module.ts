import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { RedisConfigService, RedisService } from './services';

@Global()
@Module({
  imports: [CacheModule.registerAsync({ useClass: RedisConfigService, isGlobal: true })],
  providers: [RedisConfigService, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
