"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.envalidValidator = void 0;
const nestjs_envalid_1 = require("nestjs-envalid");
const envalid_1 = require("envalid");
const config = {
    DB_URI: (0, envalid_1.str)(),
    PORT: (0, envalid_1.port)({ default: 3000 }),
    SESSION_SECRET: (0, envalid_1.str)(),
    GLOBAL_PREFIX: (0, envalid_1.str)({ default: 'api' }),
    REDIS_PORT: (0, envalid_1.num)(),
    REDIS_HOST: (0, envalid_1.str)(),
    OTP_LENGTH: (0, envalid_1.num)(),
    MAIL_PORT: (0, envalid_1.num)(),
    MAIL_HOST: (0, envalid_1.str)(),
    MAIL_PASSWORD: (0, envalid_1.str)(),
    MAIL: (0, envalid_1.str)(),
};
exports.envalidValidator = (0, nestjs_envalid_1.makeValidators)(config);
exports.ENV = 'EnvalidModuleEnv';
//# sourceMappingURL=config.js.map