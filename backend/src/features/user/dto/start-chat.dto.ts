import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class StartChatDto {
  @IsNotEmpty()
  @ApiProperty()
  public senderId: string;

  @IsNotEmpty()
  @ApiProperty()
  public receiverId: string;
}
