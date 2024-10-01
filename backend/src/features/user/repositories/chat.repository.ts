import { BaseRepository } from 'src/core/repositories/base.repository';
import { Message, MessageDocument } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from '../dto';

export class ChatRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message.name) private readonly chatModel: Model<Message>) {
    super(chatModel);
  }

  public async saveMessage(createMessageDto: CreateMessageDto): Promise<MessageDocument> {
    return this.create(createMessageDto);
  }

  public async getMessagesForUser(userId: string): Promise<MessageDocument[]> {
    return this.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
  }
}
