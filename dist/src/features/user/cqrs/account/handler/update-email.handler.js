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
exports.UpdateEmailCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_email_command_1 = require("../command/update-email.command");
const repositories_1 = require("../../../repositories");
const cqrs_2 = require("../../../../otp/cqrs");
let UpdateEmailCommandHandler = class UpdateEmailCommandHandler {
    constructor(userRepository, commandBus) {
        this.userRepository = userRepository;
        this.commandBus = commandBus;
    }
    async execute(command) {
        const validateOtp = await this.commandBus.execute(new cqrs_2.VerifyOtpCommand(command.updateEmail.email, command.updateEmail.otpCode));
        if (!validateOtp) {
            return;
        }
        else {
            return this.userRepository.findByIdAndUpdate(command.user.id, {
                $set: { email: command.updateEmail.email },
            });
        }
    }
};
exports.UpdateEmailCommandHandler = UpdateEmailCommandHandler;
exports.UpdateEmailCommandHandler = UpdateEmailCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_email_command_1.UpdatEmailCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        cqrs_1.CommandBus])
], UpdateEmailCommandHandler);
//# sourceMappingURL=update-email.handler.js.map