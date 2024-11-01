import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExploreCommand } from '../command/explore.command';
import { PostRepository } from 'src/features/user/repositories';
import { PipelineStage } from 'mongoose';

@QueryHandler(ExploreCommand)
export class ExploreCommandHandler implements IQueryHandler<ExploreCommand> {
  public readonly limit: number = 50;

  constructor(private readonly postRepository: PostRepository) {}

  public async execute(): Promise<any[]> {
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'Post',
          foreignField: '_id',
          localField: 'postId',
          as: 'postDetails',
        },
      },
      {
        $unwind: {
          preserveNullAndEmptyArrays: true,
          path: '$postDetails',
        },
      },
      {
        $sample: { size: this.limit },
      },
      {
        $lookup: {
          from: 'User',
          localField: 'author',
          foreignField: '_id',
          as: 'authorDetails',
        },
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          content: 1,
          media: 1,
          likes: 1,
          'authorDetails.username': 1,
          'authorDetails.profilePicture': 1,
          'authorDetails.fullName': 1,
        },
      },
    ];

    return this.postRepository.aggregate(pipeline, {
      allowDiskUse: true,
    });
  }
}
