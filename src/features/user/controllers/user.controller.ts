import { Body, Controller, Get, Patch } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { UpdateProfileDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../cqrs/account/command/update-profile.command';

@Controller('users')
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
}
