import { UploadApiErrorResponse, UploadApiOptions, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, options?: UploadApiOptions): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
