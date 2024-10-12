import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Message, User } from 'src/common/decorators';
import { PaginationResult } from 'src/common/pagination/interfaces/pagination-result.interface';
import { UserDocument } from 'src/features/user/schemas';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly queryBus: QueryBus) {}

  //   @Get()
  //   @Message('Sucessfully fetched the conversations.')
  //   @HttpCode(HttpStatus.OK)
  //   public async fetchConversations(
  //     @User() user: UserDocument,
  //   ): Promise<PaginationResult<UserDocument[]>> {}
}
