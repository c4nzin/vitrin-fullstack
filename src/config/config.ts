import { makeValidators, Static } from 'nestjs-envalid';
import { port, str } from 'envalid';

const config = {
  DB_URI: str(),
  PORT: port({ default: 3000 }),
  SESSION_SECRET: str(),
  GLOBAL_PREFIX: str({ default: 'api' }),
};

export const envalidValidator = makeValidators(config);
export type Config = Static<typeof envalidValidator>;
export const ENV = 'EnvalidModuleEnv';
