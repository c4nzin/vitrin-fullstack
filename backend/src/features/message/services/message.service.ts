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
}
