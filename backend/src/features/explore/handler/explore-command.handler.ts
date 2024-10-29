import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';
import { PostRepository } from 'src/features/user/repositories';
import { PipelineStage } from 'mongoose';

@QueryHandler(ExploreCommand)
export class ExploreCommandHandler implements IQueryHandler<ExploreCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  public async execute(query: ExploreCommand): Promise<any[]> {
    const { limit } = query;

    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'Post',
          localField: 'postId',
          foreignField: '_id',
          as: 'postDetails',
        },
      },
      {
        $unwind: {
          path: '$postDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'postDetails.createdAt': -1 },
      },
      {
        $sample: { size: limit },
      },
    ];

    const results = await this.postRepository.aggregate(pipeline);

    if (!results || results.length === 0) {
      console.warn('No data found or aggregation pipeline returned an empty array.');
    }

    return results;
  }
}
