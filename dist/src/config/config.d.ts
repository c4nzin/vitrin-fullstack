import { Static } from 'nestjs-envalid';
export declare const envalidValidator: import("nestjs-envalid").MakeValidatorsResult<{
    DB_URI: string;
    PORT: number;
    SESSION_SECRET: string;
    GLOBAL_PREFIX: string;
    REDIS_PORT: number;
    REDIS_HOST: string;
    OTP_LENGTH: number;
    MAIL_PORT: number;
    MAIL_HOST: string;
    MAIL_PASSWORD: string;
    MAIL: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_SECRET: string;
}>;
export type Config = Static<typeof envalidValidator>;
export declare const ENV = "EnvalidModuleEnv";
