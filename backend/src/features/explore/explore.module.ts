import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Explore, ExploreSchema } from './schemas/explore.schema';
import { ExploreController } from './controllers/explore.controller';
import { ExploreRepository } from './repositories/explore.repository';
import { allExploreHandlers } from './handler/all-explore.handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Explore.name, schema: ExploreSchema }]),
    CqrsModule,
  ],
  providers: [ExploreRepository, ...allExploreHandlers],
  controllers: [ExploreController],
  exports: [ExploreRepository, ...allExploreHandlers],
})
export class ExploreModule {}
