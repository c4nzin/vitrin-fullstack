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
import { CommandBus } from '@nestjs/cqrs';
import { Message, PublicRoute, User } from 'src/common/decorators';
import { AuthenticatedGuard } from 'src/common/guards';
import { UserDocument } from 'src/features/user/schemas';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UpdateProfileFieldsCommand } from '../command/update-profile.command';
import { UpdateEmailDto } from '../dto/update-email.dto';
import { UpdatEmailCommand } from '../command/update-email.command';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { ChangePasswordCommand } from '../command/change-password.command';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { ResetPasswordCommand } from '../command/reset-password.command';
import { ApiTags } from '@nestjs/swagger';

@Controller('account')
@ApiTags('account')
@UseGuards(AuthenticatedGuard)
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('me')
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async getUser(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }

  @Patch('profile')
  @Message('Sucessfully updated the profile.')
  @HttpCode(HttpStatus.OK)
  public async updateProfile(
    @User('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdateProfileFieldsCommand(id, updateProfileDto));
  }

  @Patch('email')
  @Message('Sucessfully updated the email.')
  @HttpCode(HttpStatus.OK)
  public async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @User() user: UserDocument,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdatEmailCommand(updateEmailDto, user));
  }

  @Patch('password')
  @Message('Sucessfully changed the password.')
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @User() user: UserDocument,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserDocument> {
    console.log(changePasswordDto);
    return this.commandBus.execute(new ChangePasswordCommand(user, changePasswordDto));
  }

  @Post('password/reset')
  @Message('Sucessfully resetted your password.')
  @HttpCode(HttpStatus.OK)
  @PublicRoute()
  public async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new ResetPasswordCommand(resetPasswordDto));
  }
}
