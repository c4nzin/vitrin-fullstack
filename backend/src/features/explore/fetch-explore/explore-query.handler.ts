import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PipelineStage } from 'mongoose';
import { PostRepository } from 'src/features/posts/repositories/post.repository';
import { ExploreQuery } from './explore.query';

@QueryHandler(ExploreQuery)
export class ExploreQueryHandler implements IQueryHandler<ExploreQuery> {
  public readonly limit: number = 10;

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
        },
      },
    ];

    return this.postRepository.aggregate(pipeline);
  }
}
