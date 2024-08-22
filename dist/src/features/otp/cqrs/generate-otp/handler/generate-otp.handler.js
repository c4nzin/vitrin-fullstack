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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtpHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const generate_otp_command_1 = require("../command/generate-otp.command");
const class_transformer_1 = require("class-transformer");
const schemas_1 = require("../../../schemas");
const repositories_1 = require("../../../repositories");
const otp_generator_1 = __importDefault(require("otp-generator"));
const common_1 = require("@nestjs/common");
const config_1 = require("../../../../../config/config");
let GenerateOtpHandler = class GenerateOtpHandler {
    constructor(commandBus, otpRepository, config) {
        this.commandBus = commandBus;
        this.otpRepository = otpRepository;
        this.config = config;
    }
    async execute(command) {
        this.generateOtp(command.email);
        this.createOtp(command.email);
    }
    async generateOtp(email) {
        const otp = this.createOtp(email);
        return this.otpRepository.create(otp);
    }
    createOtp(email) {
        const otpCode = otp_generator_1.default.generate(this.config.OTP_LENGTH, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            digits: true,
            specialChars: false,
        });
        const otp = (0, class_transformer_1.plainToInstance)(schemas_1.OTP, { email, otpCode });
        return otp;
    }
};
exports.GenerateOtpHandler = GenerateOtpHandler;
exports.GenerateOtpHandler = GenerateOtpHandler = __decorate([
    (0, cqrs_1.CommandHandler)(generate_otp_command_1.GenerateOtpCommand),
    __param(2, (0, common_1.Inject)(config_1.ENV)),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        repositories_1.OtpRepository, Object])
], GenerateOtpHandler);
//# sourceMappingURL=generate-otp.handler.js.map