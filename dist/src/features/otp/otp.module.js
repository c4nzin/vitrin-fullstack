"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("./schemas/otp.schema");
const otp_repository_1 = require("./repositories/otp.repository");
const controllers_1 = require("./controllers");
const user_module_1 = require("../user/user.module");
const generate_otp_handler_1 = require("./cqrs/generate-otp/handler/generate-otp.handler");
const cqrs_1 = require("@nestjs/cqrs");
const verify_otp_handler_1 = require("./cqrs/verify-otp/handler/verify-otp.handler");
let OtpModule = class OtpModule {
};
exports.OtpModule = OtpModule;
exports.OtpModule = OtpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: otp_schema_1.OTP.name, schema: otp_schema_1.OtpSchema }]),
            user_module_1.UserModule,
            cqrs_1.CqrsModule,
        ],
        providers: [otp_repository_1.OtpRepository, generate_otp_handler_1.GenerateOtpHandler, verify_otp_handler_1.VerifyOtpHandler],
        controllers: [controllers_1.OtpController],
        exports: [otp_repository_1.OtpRepository],
    })
], OtpModule);
//# sourceMappingURL=otp.module.js.map