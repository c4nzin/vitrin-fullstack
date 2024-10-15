import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { MessageDocument } from '../schemas/message.schema';
import { ConversationRepository } from 'src/features/conversation/repositories/conversation.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  public async createMessage(
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<MessageDocument> {
    const newMessage = await this.messageRepository.create({
      senderId,
      receiverId,
      content,
    });

    const conversation = await this.conversationRepository.findOne({
      senderId,
      receiverId,
    });

    if (conversation) {
      conversation.lastMessage = content;
      await conversation.save();
    } else {
      await this.conversationRepository.createConversation({
        senderId,
        receiverId,
        lastMessage: content,
        profilePhoto: '',
        username: '',
      });
    }

    return newMessage.save();
  }

  public async getMessagesBetweenUsers(
    senderId: string,
    receiverId: string,
  ): Promise<MessageDocument[]> {
    return this.messageRepository
      .find({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 });
  }

  public async getLatestConversationsForUser(userId: string): Promise<any[]> {
    const messages = await this.messageRepository
      .find({
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .sort({ createdAt: -1 });

    const groupedConversations = messages.reduce(
      (acc: Object, message: MessageDocument) => {
        const otherUserId =
          message.senderId === userId ? message.receiverId : message.senderId;

        if (!acc[otherUserId]) {
          acc[otherUserId] = { ...message, otherUserId };
        }

        return acc;
      },
      {},
    );

    return Object.values(groupedConversations);
  }
}
