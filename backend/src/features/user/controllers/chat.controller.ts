import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Message } from 'src/common/decorators';
import { StartChatDto } from '../dto';

@Controller('chat')
export class ChatController {
  constructor() {}

  @Post('start')
  @Message('Sucessfully created the chat room.')
  @HttpCode(HttpStatus.CREATED)
  public async startChat(@Body() startChatDto: StartChatDto): Promise<object> {
    return { roomId: `${startChatDto.receiverId}-${startChatDto.senderId}` };
  }
}
