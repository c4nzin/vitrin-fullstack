"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAccountCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const verify_account_command_1 = require("../command/verify-account.command");
const repositories_1 = require("../../../../user/repositories");
const cqrs_2 = require("../../../../otp/cqrs");
let VerifyAccountCommandHandler = class VerifyAccountCommandHandler {
    constructor(userRepository, commandBus) {
        this.userRepository = userRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        await this.commandBus.execute(new cqrs_2.VerifyOtpCommand(command.otpDto.email, command.otpDto.otpCode));
        await this.userRepository.findOneAndUpdate({ email: command.otpDto.email }, {
            $set: { isEmailVerified: true },
        });
    }
};
exports.VerifyAccountCommandHandler = VerifyAccountCommandHandler;
exports.VerifyAccountCommandHandler = VerifyAccountCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(verify_account_command_1.VerifyAccountCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        cqrs_1.CommandBus])
], VerifyAccountCommandHandler);
//# sourceMappingURL=verify-account.handler.js.map