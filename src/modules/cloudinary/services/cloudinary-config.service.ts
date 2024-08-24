import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';
import { Config, ENV } from 'src/config/config';

export const CloudinaryConfigProvider = {
  provide: CLOUDINARY,
  useFactory: (config: Config) => {
    return v2.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
    });
  },
  inject: [ENV],
};
