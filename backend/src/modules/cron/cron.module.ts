import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronConfigFactory } from './services/cron.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({ useClass: CronConfigFactory }),
  ],
})
export class CronModule {}
