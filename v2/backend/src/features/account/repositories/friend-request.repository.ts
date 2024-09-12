import { BaseRepository } from 'src/core/repositories/base.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FriendRequest } from '../schemas/friend-request.schema';
export class FriendRequestRepository extends BaseRepository<FriendRequest> {
  constructor(
    @InjectModel(FriendRequest.name)
    private readonly friendRequestModel: Model<FriendRequest>,
  ) {
    super(friendRequestModel);
  }
}
