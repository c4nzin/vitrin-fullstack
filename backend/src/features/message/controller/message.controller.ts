import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { Message, User } from 'src/common/decorators';
import { UserDocument } from 'src/features/user/schemas';
import { ApiTags } from '@nestjs/swagger';
import { ConversationService } from 'src/features/conversation/services/conversation.service';
import { MessageDocument } from '../schemas/message.schema';
import { LocalAuthGuard } from 'src/common/guards';

@Controller('conversations')
@ApiTags('conservations')
@UseGuards(LocalAuthGuard)
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
  ) {}

  @Post(':conversationId/messages')
  @Message('Sucessfully created the message.')
  @HttpCode(HttpStatus.CREATED)
  public async createMessage(
    @Param('conversationId') conversationId: string,
    @Body('content') content: string,
    @User() user: UserDocument,
  ): Promise<MessageDocument> {
    const message = await this.messageService.createMessage(
      conversationId,
      user.id,
      content,
    );

    this.conversationService.emitNewMessage(conversationId, message);

    return message;
  }

  @Get(':conversationId/messages')
  @Message('Sucessfully fetched all messages.')
  @HttpCode(HttpStatus.OK)
  public async getMessages(
    @Param('conversationId') conversationId: string,
  ): Promise<any> {
    return this.messageService.getMessages(conversationId);
  }
}
