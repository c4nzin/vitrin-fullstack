import { Module } from '@nestjs/common';
import { ExploreController } from './controllers/explore.controller';
import { allExploreHandlers } from './handler/all-explore.handlers';
import { CqrsModule } from '@nestjs/cqrs';
import { PostModule } from '../posts/post.module';
import { ExploreCronService } from './services/explore-cron.service';

@Module({
  imports: [CqrsModule, PostModule],
  controllers: [ExploreController],
  providers: [...allExploreHandlers, ExploreCronService],
  exports: [...allExploreHandlers, ExploreCronService],
})
export class ExploreModule {}
