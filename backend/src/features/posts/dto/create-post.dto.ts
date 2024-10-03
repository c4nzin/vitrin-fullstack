import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  @MaxLength(255)
  public content: string;

  @IsOptional()
  @IsString()
  public media?: string;
}
