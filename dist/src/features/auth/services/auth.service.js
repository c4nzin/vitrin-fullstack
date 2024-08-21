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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("../../user/repositories");
let AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateUser(username, password) {
        const user = await this.userRepository.findByUsername(username);
        const isValidPassword = await this.userRepository.isCorrectPassword(password, user.password);
        if (user && isValidPassword) {
            return user;
        }
        return null;
    }
    async login(loginDto) { }
    async register(registerDto) {
        const user = await this.userRepository.findByUsernameAndEmail(registerDto.username, registerDto.email);
        if (user) {
            throw new common_1.BadRequestException('User is already registered.');
        }
        return this.userRepository.create(registerDto);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], AuthService);
//# sourceMappingURL=auth.service.js.map