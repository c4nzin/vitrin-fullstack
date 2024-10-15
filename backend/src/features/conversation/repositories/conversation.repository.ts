import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Conversation, ConversationDocument } from '../schemas/conversation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ConversationRepository extends BaseRepository<Conversation> {
  constructor(
    @InjectModel(Conversation.name)
    private readonly conversationModel: Model<Conversation>,
  ) {
    super(conversationModel);
  }

  public async createConversation(payload: {
    senderId: string;
    receiverId: string;
    lastMessage: string;
    profilePhoto: string;
    username: string;
  }): Promise<ConversationDocument> {
    const conversationId = uuidv4(); //bunun yerine zaten documentin içinde id olan veriyi kullanabilirim?
    return this.conversationModel.create({ ...payload, conversationId });
  }

  public async findConversationById(
    conversationId: string,
  ): Promise<ConversationDocument | null> {
    const conversation = await this.conversationModel
      .findOne({ conversationId })
      .populate('senderId', 'username profilePicture')
      .populate('receiverId', 'username profilePicture');

    if (!conversation) {
      throw new NotFoundException('No conversation found.');
    }

    return conversation;
  }

  public async findConversationByUserIds(
    senderId: string,
    receiverId: string,
  ): Promise<ConversationDocument | null> {
    return this.conversationModel.findOne({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });
  }
}
