import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Message, User } from 'src/common/decorators';
import { PageDto, PageOptionsDto } from 'src/common/pagination/dto';
import { FetchRequestCommand } from 'src/features/friend/command/fetch-requests.command';
import { UserDocument } from 'src/features/user/schemas';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationController {
  constructor(private readonly queryBus: QueryBus) {}

  //şuanlık sadece arkadaş isteklerini gösteriyor. ileride bunu bütün tür notificationlara çevirmek gerek.
  @Get()
  @Message('Sucessfully fetched the notifications.')
  @HttpCode(HttpStatus.OK)
  public async fetchNotifications(
    @User() user: UserDocument,
    @Query() paginate: PageOptionsDto,
  ): Promise<PageDto<any>> {
    return this.queryBus.execute(new FetchRequestCommand(user, paginate));
  }
}
