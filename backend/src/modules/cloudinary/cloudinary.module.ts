import { Module } from '@nestjs/common';
import { CloudinaryConfigProvider } from './services/cloudinary-config.service';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  providers: [CloudinaryConfigProvider, CloudinaryService],
  exports: [CloudinaryConfigProvider, CloudinaryService],
})
export class CloudinaryModule {}
