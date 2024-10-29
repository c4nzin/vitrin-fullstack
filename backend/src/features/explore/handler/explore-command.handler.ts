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
        $lookup: {
          from: 'User',
          localField: 'userId',
          foreignField: '_id',
          as: 'User',
        },
      },
      {
        $unwind: {
          path: '$User',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: { 'postDetails.createdAt': -1 },
      },
      {
        $sample: { size: limit },
      },
      {
        $project: {
          _id: '$postDetails._id',
          content: '$postDetails.content',
          media: '$postDetails.media',
          authorId: '$User._id',
          authorName: '$User.username',
          profilePicture: '$User.profilePicture',
          likes: '$postDetails.likes',
        },
      },
    ];

    const results = await this.postRepository.aggregate(pipeline);

    console.log(results);

    return results;
  }
}
