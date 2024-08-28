import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { UpdateEmailDto, UpdateProfileDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../cqrs/account/command/update-profile.command';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UpdatEmailCommand } from '../cqrs/account/command/update-email.command';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('me')
  public async getUser(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }

  @Patch('update')
  public async updateProfile(
    @User('id') id: string,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdateProfileFieldsCommand(id, updateProfile));
  }
  @Post('update-email')
  public async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @User() user: UserDocument,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdatEmailCommand(updateEmailDto, user));
  }
}
