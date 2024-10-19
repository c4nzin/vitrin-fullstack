import { Injectable, Inject } from '@nestjs/common';
import { ConversationRepository } from '../repositories/conversation.repository';
import { ConversationDocument } from '../schemas/conversation.schema';
import { Types } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ChatGateway } from 'src/modules/websocket/gateways/chat.gateway';
import { MessageDocument } from 'src/features/message/schemas/message.schema';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly chatGateway: ChatGateway,
  ) {}

  public async createConversation(participants: string[]): Promise<ConversationDocument> {
    const participantIds = participants.map((id) => new Types.ObjectId(id));

    const conversation = await this.conversationRepository.create({
      participants: participantIds,
    });

    const userKeys = participants.map((p) => `user:${p}`);
    const socketIds = (await this.cacheManager.store.mget(...userKeys)) as string[];

    this.chatGateway.server.to(socketIds).emit('newConversation', conversation);
    return conversation;
  }

  public async getConversations(userId: string): Promise<ConversationDocument[]> {
    const conversations = await this.conversationRepository
      .find({ participants: new Types.ObjectId(userId) })
      .populate('lastMessage')
      .exec();

    return conversations;
  }

  public emitNewMessage(conversationId: string, message: MessageDocument): void {
    this.chatGateway.server.to(conversationId).emit('newMessage', message);
  }
}
