import { makeValidators, Static } from 'nestjs-envalid';
import { num, port, str } from 'envalid';

const config = {
  DB_URI: str(),
  PORT: port({ default: 3000 }),
  SESSION_SECRET: str(),
  GLOBAL_PREFIX: str({ default: 'api' }),
  REDIS_PORT: num(),
  REDIS_HOST: str(),
  OTP_LENGTH: num(),
  MAIL_PORT: num(),
  MAIL_HOST: str(),
  THUMBNAIL_URL: str({ default: process.env.THUMBNAIL_URL }),
  MAIL_PASSWORD: str(),
  MAIL: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_SECRET: str(),
  PROFILE_PICTURE_URL: str({ default: process.env.PROFILE_PICTURE_URL }),
  HASH_SALT_ROUNDS: num({ default: 10 }),
  GOOGLE_BOOKS_API_KEY: str(),
  GOOGLE_CLIENT_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CALLBACK_URL: str(),
  HTTP_TIMEOUT: num({ default: 5000 }),
  MAX_REDIRECTS: num({ default: 5 }),
};

export const envalidValidator = makeValidators(config);
export type Config = Static<typeof envalidValidator>;
export const ENV = 'EnvalidModuleEnv';
