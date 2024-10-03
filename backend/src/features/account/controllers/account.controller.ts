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
import { Message, User } from 'src/common/decorators';
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
export class AccountController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  @Message('Sucessfully fetched the user.')
  @HttpCode(HttpStatus.OK)
  public async getUser(@User() user: UserDocument): Promise<UserDocument> {
    return user;
  }

  @Patch('update')
  @UseGuards(AuthenticatedGuard)
  @Message('Sucessfully updated the profile.')
  @HttpCode(HttpStatus.OK)
  public async updateProfile(
    @User('id') id: string,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdateProfileFieldsCommand(id, updateProfile));
  }

  @Post('update-email')
  @UseGuards(AuthenticatedGuard)
  @Message('Sucessfully updated the email.')
  @HttpCode(HttpStatus.OK)
  public async updateEmail(
    @Body() updateEmailDto: UpdateEmailDto,
    @User() user: UserDocument,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UpdatEmailCommand(updateEmailDto, user));
  }

  @Post('change-password')
  @UseGuards(AuthenticatedGuard)
  @Message('Sucessfully changed the password.')
  @HttpCode(HttpStatus.OK)
  public async changePassword(
    @User() user: UserDocument,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<UserDocument> {
    console.log(changePasswordDto);
    return this.commandBus.execute(new ChangePasswordCommand(user, changePasswordDto));
  }

  @Post('reset-password')
  @Message('Sucessfully resetted your password.')
  @HttpCode(HttpStatus.OK)
  public async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.commandBus.execute(new ResetPasswordCommand(resetPasswordDto));
  }
}
