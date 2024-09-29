import { BaseRepository } from 'src/core/repositories/base.repository';
import { Message } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ChatRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message.name) private readonly chatModel: Model<Message>) {
    super(chatModel);
  }

  public async saveMessage(senderId: string, receiverId: string, message: string) {
    return this.create({ senderId, receiverId, message });
  }

  public async getMessagesForUser(userId: string) {
    return this.find({ $or: [{ senderId: userId }, { receiverId: userId }] }).exec();
  }
}
