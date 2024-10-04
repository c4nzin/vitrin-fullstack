import { Global, Module } from '@nestjs/common';
import { ThrottlerModule as RootThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from './throttler-config.service';

@Global()
@Module({
  imports: [RootThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService })],
})
export class ThrottlerModule {}
