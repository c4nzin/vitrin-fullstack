"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_envalid_1 = require("nestjs-envalid");
const config_1 = require("./config/config");
const database_module_1 = require("./common/database/database.module");
const nestjs_pino_1 = require("nestjs-pino");
const user_module_1 = require("./features/user/user.module");
const auth_module_1 = require("./features/auth/auth.module");
const bull_module_1 = require("./modules/bull/bull.module");
const otp_module_1 = require("./features/otp/otp.module");
const throttler_1 = require("@nestjs/throttler");
const cloudinary_module_1 = require("./modules/cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_envalid_1.EnvalidModule.forRoot({
                validators: config_1.envalidValidator,
                isGlobal: true,
                useDotenv: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            destination: './logs/app.log',
                            mkdir: true,
                            colorize: true,
                        },
                    },
                    level: 'info',
                },
            }),
            database_module_1.DatabaseModule,
            bull_module_1.BullModule,
            otp_module_1.OtpModule,
            throttler_1.ThrottlerModule,
            cloudinary_module_1.CloudinaryModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map