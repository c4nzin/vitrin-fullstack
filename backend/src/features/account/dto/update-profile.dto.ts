import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { IsUserFieldUnique } from 'src/common/decorators';
import { Gender } from 'src/features/user/schemas/enum/gender.enum';

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
  public gender: number;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  public website: string;
}
