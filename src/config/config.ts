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
  MAIL_PASSWORD: str(),
  MAIL: str(),
  CLOUDINARY_API_KEY: str(),
  CLOUDINARY_CLOUD_NAME: str(),
  CLOUDINARY_API_SECRET: str(),
  PROFILE_PICTURE_URL: str({ default: process.env.PROFILE_PICTURE_URL }),
};

export const envalidValidator = makeValidators(config);
export type Config = Static<typeof envalidValidator>;
export const ENV = 'EnvalidModuleEnv';
