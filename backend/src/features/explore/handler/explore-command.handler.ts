import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';
import { ExploreDocument } from '../schemas/explore.schema';
import { ExploreRepository } from '../repositories/explore.repository';

@QueryHandler(ExploreCommand)
export class ExploreCommandHandler implements IQueryHandler<ExploreCommand> {
  constructor(private readonly exploreRepository: ExploreRepository) {}

  public async execute(query: ExploreCommand): Promise<any[]> {
    const { limit } = query;

    const pipeline = [
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
        $unwind: {
          path: '$Post',
        },
      },
    ];

    const results = await this.exploreRepository.aggregate(pipeline);

    if (!results || results.length === 0) {
      console.warn('No data found or aggregation pipeline returned an empty array.');
    }

    return results;
  }
}
