import { Module } from '@nestjs/common';
import { ExploreController } from './controllers/explore.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PostModule } from '../posts/post.module';
import { allExploreHandlers } from './fetch-explore/handler/all-explore.handlers';

@Module({
  imports: [CqrsModule, PostModule],
  controllers: [ExploreController],
  providers: [...allExploreHandlers],
  exports: [...allExploreHandlers],
})
export class ExploreModule {}
