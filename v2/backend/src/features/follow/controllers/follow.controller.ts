import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import { CommandBus } from '@nestjs/cqrs';
import { FollowCommand } from '../cqrs/command/follow.command';
import { UnfollowCommand } from '../cqrs/command/unfollow.command';
import { FetchFollowersCommand } from '../cqrs/command/fetch-followers.command';
import { AuthenticatedGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from 'src/common/pagination/dto';
import { PageOptionsDto } from 'src/common/pagination/dto/page-options.dto';
import { UserDocument } from 'src/features/user/schemas';

@Controller()
@ApiTags('follow')
@UseGuards(AuthenticatedGuard)
export class FollowController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':id/follow')
  @Message('Sucessfully followed the user.')
  @HttpCode(HttpStatus.OK)
  public async follow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new FollowCommand(user, id));
  }

  @Delete(':id/unfollow')
  @Message('Sucessfully unfollowed the user.')
  @HttpCode(HttpStatus.OK)
  public async unfollow(
    @User() user: UserDocument,
    @Param('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UnfollowCommand(user, id));
  }

  @Get(':id/followers')
  @Message('Sucessfully fetched users.')
  @HttpCode(HttpStatus.OK)
  public async getFollowers(
    @Param('id') id: string,
    @Query() paginate: PageOptionsDto,
  ): Promise<PageDto<any>> {
    return this.commandBus.execute(new FetchFollowersCommand(id, paginate));
  }
}