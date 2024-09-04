import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2,
} from 'cloudinary';
import toStream from 'streamifier';

@Injectable()
export class CloudinaryService {
  public async uploadFile(
    file: Express.Multer.File,
    options?: UploadApiOptions,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(options, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });

      toStream.createReadStream(file.buffer).pipe(upload);
    });
  }
}
