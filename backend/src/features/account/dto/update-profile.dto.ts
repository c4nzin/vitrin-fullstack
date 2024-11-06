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
  @IsString()
  @Length(3, 30)
  public fullName: string;

  @IsOptional()
  @ApiProperty()
  @IsEnum(() => Gender) //using lazy loading here to avoid circular dependecy issue.
  public gender: number;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  public website: string;
}
