import { Controller, Get, Query } from '@nestjs/common';
import { MessageDocument } from '../schemas/message.schema';
import { MessageService } from '../services/message.service';
import { User } from 'src/common/decorators';
import { UserDocument } from 'src/features/user/schemas';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('conversations')
  public async getConversations(@User() user: UserDocument): Promise<any[]> {
    return this.messageService.getConversations(user.id);
  }
}
