import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from '../schemas/conversation.schema';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/core/repositories/base.repository';

@Injectable()
export class ConversationRepository extends BaseRepository<Conversation> {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
  ) {
    super(conversationModel);
  }
}
