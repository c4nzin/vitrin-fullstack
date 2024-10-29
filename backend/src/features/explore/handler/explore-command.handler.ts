import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';
import { ExploreDocument } from '../schemas/explore.schema';
import { ExploreRepository } from '../repositories/explore.repository';

@QueryHandler(ExploreCommand)
export class ExploreCommandHandler implements IQueryHandler<ExploreCommand> {
  constructor(private readonly exploreRepository: ExploreRepository) {}

  public execute(query: ExploreCommand): Promise<ExploreDocument[]> {
    const { limit } = query;

    return this.exploreRepository.aggregate([
      { $sample: { size: limit } },
      {
        $lookup: {
          from: 'Post',
          localField: 'postId',
          foreignField: '_id',
          as: 'Post',
        },
      },
      {
        $unwind: '$Post',
      },
    ]);
  }
}
