import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../interfaces/page-meta-dto-parameters.interface';
//pagination dto
export class PageMetaDto {
  @ApiProperty()
  public readonly page: number;

  @ApiProperty()
  public readonly take: number;

  @ApiProperty()
  public readonly itemCount: number;

  @ApiProperty()
  public readonly pageCount: number;

  @ApiProperty()
  public readonly hasPreviousPage: boolean;

  @ApiProperty()
  public readonly hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
