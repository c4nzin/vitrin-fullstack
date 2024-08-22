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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../dto/");
const cqrs_1 = require("@nestjs/cqrs");
const generate_otp_command_1 = require("../cqrs/generate-otp/command/generate-otp.command");
const verify_otp_command_1 = require("../cqrs/verify-otp/command/verify-otp.command");
let OtpController = class OtpController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async sendOtp(otpDto) {
        await this.commandBus.execute(new generate_otp_command_1.GenerateOtpCommand(otpDto.email));
    }
    async verifyOtp(otpDto) {
        await this.commandBus.execute(new verify_otp_command_1.VerifyOtpCommand(otpDto.email, otpDto.otpCode));
    }
};
exports.OtpController = OtpController;
__decorate([
    (0, common_1.Post)('sendotp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SendOtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.Post)('verifyOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OtpDto]),
    __metadata("design:returntype", Promise)
], OtpController.prototype, "verifyOtp", null);
exports.OtpController = OtpController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], OtpController);
//# sourceMappingURL=otp.controller.js.map