"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const session_serializer_1 = require("./serializer/session.serializer");
const controllers_1 = require("./controllers");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const strategies_1 = require("./strategies");
const cqrs_1 = require("@nestjs/cqrs");
const cqrs_2 = require("./cqrs");
const auth_profile_1 = require("./profiles/auth.profile");
const classes_1 = require("@automapper/classes");
const nestjs_1 = require("@automapper/nestjs");
const bull_1 = require("@nestjs/bull");
const services_1 = require("../../modules/email/services");
const otp_module_1 = require("../otp/otp.module");
const is_field_unique_decorator_1 = require("../../common/decorators/is-field-unique.decorator");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ session: true }),
            cqrs_1.CqrsModule,
            nestjs_1.AutomapperModule.forRoot({ strategyInitializer: (0, classes_1.classes)() }),
            bull_1.BullModule.registerQueue({ name: services_1.EMAIL_QUEUE }),
            otp_module_1.OtpModule,
        ],
        controllers: [controllers_1.AuthController],
        providers: [
            session_serializer_1.SessionSerializer,
            strategies_1.LocalStrategy,
            cqrs_2.RegisterUserHandler,
            cqrs_2.LoginUserHandler,
            auth_profile_1.AuthProfile,
            is_field_unique_decorator_1.IsFieldUniqueDecorator,
        ],
        exports: [],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map