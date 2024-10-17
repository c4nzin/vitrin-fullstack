import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import { UserDocument } from 'src/features/user/schemas';
import { ConversationService } from '../services/conversation.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('conversations')
@ApiTags('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  @Message('Sucessfully created the conversation.')
  @HttpCode(HttpStatus.CREATED)
  public async createConversation(
    @User() user: UserDocument,
    @Body('receivers') receivers: string[],
  ) {
    const participants = [user.id, ...receivers];
    return this.conversationService.createConversation(participants);
  }

  @Get()
  @Message('Sucessfully fetched all conversations.')
  @HttpCode(HttpStatus.OK)
  public async getConversations(@User() user: UserDocument) {
    return this.conversationService.getConversations(user.id);
  }
}