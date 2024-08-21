import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfigService } from './database.service';

@Module({
  imports: [MongooseModule.forRootAsync({ useClass: DatabaseConfigService })],
})
export class DatabaseModule {}
