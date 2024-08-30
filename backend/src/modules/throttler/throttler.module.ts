import { Module } from '@nestjs/common';
import { ThrottlerModule as RootThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from './throttler-config.service';

@Module({
  imports: [RootThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService })],
})
export class ThrottlerModule {}
