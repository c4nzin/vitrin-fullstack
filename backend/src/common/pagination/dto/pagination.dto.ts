import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public limit?: number;
}
