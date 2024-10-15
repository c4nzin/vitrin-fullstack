import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../repositories/message.repository';
import { MessageDocument } from '../schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

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

    const groupedConversations = messages.reduce((acc, message) => {
      const otherUserId =
        message.senderId === userId ? message.receiverId : message.senderId;

      if (!acc[otherUserId]) {
        acc[otherUserId] = { ...message, otherUserId };
      }

      return acc;
    }, {});

    return Object.values(groupedConversations);
  }
}
