import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Message, User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { UpdateEmailDto } from '../dto';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../../account/cqrs/command/update-profile.command';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UpdatEmailCommand } from '../../account/cqrs/command/update-email.command';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from 'src/features/account/dto/update-profile.dto';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ChangePasswordCommand } from '../cqrs/user/command/change-password.command';

@Controller()
@ApiTags('user')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('me')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async getUser(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }

  @Patch('update')
  @Message('Sucessfully updated the profile.')
  @HttpCode(HttpStatus.OK)
  public async updateProfile(
    @User('id') id: string,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdateProfileFieldsCommand(id, updateProfile));
  }
  @Post('update-email')
  @Message('Sucessfully updated the email.')
  @HttpCode(HttpStatus.OK)
  public async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @User() user: UserDocument,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdatEmailCommand(updateEmailDto, user));
  }

  @Post('change-password')
  @Message('Sucessfully changed the password.')
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @User() user: UserDocument,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserDocument> {
    console.log(changePasswordDto);
    return this.commandBus.execute(new ChangePasswordCommand(user, changePasswordDto));
  }

  //add reset password
}
