import { Module } from '@nestjs/common';
import { ExploreController } from './controllers/explore.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { PostModule } from '../posts/post.module';
import { allExploreHandlers } from './fetch-explore/all-explore.handlers';
import { GoogleBookService } from '../book/services/google-book.service';

@Module({
  imports: [CqrsModule, PostModule],
  controllers: [ExploreController],
  providers: [GoogleBookService, ...allExploreHandlers],
  exports: [...allExploreHandlers],
})
export class ExploreModule {}
