import { Module } from '@nestjs/common';
import { ExploreController } from './controllers/explore.controller';
import { allExploreHandlers } from './handler/all-explore.handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { PostModule } from '../posts/post.module';
import { ExploreCronService } from './services/explore-cron.service';
import { RedisModule } from 'src/modules/redis/redis.module';

@Module({
  imports: [CqrsModule, PostModule, RedisModule],
  controllers: [ExploreController],
  providers: [...allExploreHandlers, ExploreCronService],
  exports: [...allExploreHandlers, ExploreCronService],
})
export class ExploreModule {}
