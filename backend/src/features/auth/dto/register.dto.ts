import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUserFieldUnique } from 'src/common/decorators/is-field-unique.decorator';
import { Gender } from 'src/features/user/schemas/enum/gender.enum';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  @IsUserFieldUnique('username')
  public username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsUserFieldUnique('email')
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(6, 15)
  public password: string;

  @IsEnum(Gender)
  public gender: Gender = Gender.NOT_KNOWN;
}
