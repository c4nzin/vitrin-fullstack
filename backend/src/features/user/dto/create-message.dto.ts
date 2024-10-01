import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public receiverId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public senderId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public message: string;

  //   @ApiProperty()
  //   @IsDate()
  //   public date: Date;
}
