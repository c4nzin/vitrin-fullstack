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
exports.RegisterUserHandler = void 0;
const repositories_1 = require("../../../../user/repositories");
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const __1 = require("../..");
const bull_1 = require("@nestjs/bull");
const services_1 = require("../../../../../modules/email/services");
const cqrs_2 = require("../../../../otp/cqrs");
let RegisterUserHandler = class RegisterUserHandler {
    constructor(userRepository, commandBus, emailQueue) {
        this.userRepository = userRepository;
        this.commandBus = commandBus;
        this.emailQueue = emailQueue;
    }
    async execute(command) {
        const user = await this.userRepository.findByUsernameAndEmail(command.user.username, command.user.email);
        if (user) {
            throw new common_1.BadRequestException('User is already registered.');
        }
        const otp = await this.commandBus.execute(new cqrs_2.GenerateOtpCommand(command.user.email));
        await this.emailQueue.add(services_1.USER_REGISTERED, {
            email: command.user.email,
            username: command.user.username,
            otp,
        }, { lifo: true, delay: 10000, priority: 1 });
        return this.userRepository.create(command.user);
    }
};
exports.RegisterUserHandler = RegisterUserHandler;
exports.RegisterUserHandler = RegisterUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.RegisterUserCommand),
    __param(2, (0, bull_1.InjectQueue)(services_1.EMAIL_QUEUE)),
    __metadata("design:paramtypes", [repositories_1.UserRepository,
        cqrs_1.CommandBus, Object])
], RegisterUserHandler);
//# sourceMappingURL=register-user.handler.js.map