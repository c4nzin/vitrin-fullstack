import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { MessageDocument } from '../schemas/message.schema';
import { Types } from 'mongoose';
import { ConversationRepository } from 'src/features/conversation/repositories/conversation.repository';
import { ChatGateway } from 'src/modules/websocket/gateways/chat.gateway';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  public async createMessage(
    conversationId: string,
    senderId: string,
    content: string,
  ): Promise<MessageDocument> {
    const message = await this.messageRepository.create({
      conversation: new Types.ObjectId(conversationId),
      sender: new Types.ObjectId(senderId),
      content,
    });

    await this.conversationRepository.findByIdAndUpdate(conversationId, {
      lastMessage: message._id,
    });

    return message;
  }

  public async getMessages(conversationId: string): Promise<any> {
    const messages = await this.messageRepository
      .find({ conversation: new Types.ObjectId(conversationId) })
      .populate({
        path: 'sender',
        select: 'username profilePicture',
      })
      .exec();

    return messages;
  }

  //KULLANILACAK
}
