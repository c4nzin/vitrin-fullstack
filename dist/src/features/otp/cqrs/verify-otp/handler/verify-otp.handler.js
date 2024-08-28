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
exports.VerifyOtpHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const verify_otp_command_1 = require("../command/verify-otp.command");
const repositories_1 = require("../../../repositories");
let VerifyOtpHandler = class VerifyOtpHandler {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async execute(command) {
        return this.validateOtp(command.email, command.otpCode);
    }
    async validateOtp(email, otpCode) {
        const otp = await this.otpRepository.findOne({ otpCode });
        return this.verifyOtp(otp, otpCode);
    }
    verifyOtp(otp, otpCode) {
        if (!otp || otp.otpCode !== otpCode) {
            return false;
        }
        else {
            return true;
        }
    }
};
exports.VerifyOtpHandler = VerifyOtpHandler;
exports.VerifyOtpHandler = VerifyOtpHandler = __decorate([
    (0, cqrs_1.CommandHandler)(verify_otp_command_1.VerifyOtpCommand),
    __metadata("design:paramtypes", [repositories_1.OtpRepository])
], VerifyOtpHandler);
//# sourceMappingURL=verify-otp.handler.js.map