import { Module } from '@nestjs/common';
import { BullModule as RootBullModule } from '@nestjs/bull';
import { BullService } from './bull.service';

@Module({
  imports: [RootBullModule.forRootAsync({ useClass: BullService })],
})
export class BullModule {}
