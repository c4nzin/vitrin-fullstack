import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Message } from 'src/common/decorators';
import { PaginationResult } from 'src/common/pagination/interfaces/pagination-result.interface';
import { UserDocument } from 'src/features/user/schemas';
import { ConversationRepository } from '../repositories/conversation.repository';
import { ConversationDocument } from '../schemas/conversation.schema';

@Controller('conversations')
export class ConversationController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  @Get(':conversationId')
  @Message('Sucessfully fetched the conversations.')
  @HttpCode(HttpStatus.OK)
  public async fetchConversations(
    @Query('conversationId') conversationId: string,
  ): Promise<ConversationDocument> {
    const conversation =
      await this.conversationRepository.findConversationById(conversationId);

    if (!conversation) {
      throw new BadRequestException('Conversation not found.');
    }

    return conversation;
  }
}
