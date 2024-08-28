import {
  Controller,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoPipe } from '../pipes/photo.pipe';
import { User } from 'src/common/decorators';
import { UserDocument } from '../schemas';
import { CommandBus } from '@nestjs/cqrs';
import { UploadPhotoCommand } from '../cqrs/photo/command/upload-photo.command';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('users')
@UseGuards(AuthenticatedGuard)
export class PhotoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('me/profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadProfilePhoto(
    @UploadedFile(PhotoPipe) file: Express.Multer.File,
    @User('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UploadPhotoCommand(file, id));
  }

  @Put('me/profile-photo')
  @UseInterceptors(FileInterceptor('file'))
  public async updateProfilephoto(
    @UploadedFile(PhotoPipe) file: Express.Multer.File,
    @User('id') id: string,
  ): Promise<UserDocument> {
    return this.commandBus.execute(new UploadPhotoCommand(file, id));
  }
}
