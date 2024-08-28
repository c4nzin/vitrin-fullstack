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
exports.LoginUserHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const repositories_1 = require("../../../../user/repositories");
const common_1 = require("@nestjs/common");
const __1 = require("../..");
let LoginUserHandler = class LoginUserHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        await this.login(command.user);
        return this.validateUser(command.user.username, command.user.password);
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            throw new common_1.BadRequestException('No user found.');
        }
        if (!user.isEmailVerified) {
            throw new common_1.BadRequestException('You must verify your account!');
        }
        const isValidPassword = await this.userRepository.isCorrectPassword(password, user.password);
        if (user && isValidPassword) {
            return user;
        }
        return null;
    }
    async login(loginDto) { }
};
exports.LoginUserHandler = LoginUserHandler;
exports.LoginUserHandler = LoginUserHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.LoginUserCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], LoginUserHandler);
//# sourceMappingURL=login-user.handler.js.map