import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { Gender } from '../schemas';
import { IsUserFieldUnique } from 'src/common/decorators';

export class UpdateProfileDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  @Length(3, 15)
  @IsUserFieldUnique('username')
  public username: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  @Length(0, 255)
  public bio: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(Gender)
  @Length(3, 15)
  public gender: number;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  public website: string;
}
