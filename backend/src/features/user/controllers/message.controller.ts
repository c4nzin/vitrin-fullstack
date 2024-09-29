import { Controller, Get, Param } from '@nestjs/common';
import { ChatRepository } from '../repositories';

@Controller('messages')
export class MessageController {
  constructor(private readonly chatRepository: ChatRepository) {}

  @Get(':userId')
  public async getMessages(@Param('userId') userId: string) {
    return this.chatRepository.getMessagesForUser(userId);
  }
}
