import { Static } from 'nestjs-envalid';
export declare const envalidValidator: import("nestjs-envalid").MakeValidatorsResult<{
    DB_URI: string;
    PORT: number;
    SESSION_SECRET: string;
    GLOBAL_PREFIX: string;
}>;
export type Config = Static<typeof envalidValidator>;
export declare const ENV = "EnvalidModuleEnv";
