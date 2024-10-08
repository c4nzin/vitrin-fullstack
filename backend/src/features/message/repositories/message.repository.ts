import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Message } from '../schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessageRepository extends BaseRepository<Message> {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {
    super(messageModel);
  }
}
