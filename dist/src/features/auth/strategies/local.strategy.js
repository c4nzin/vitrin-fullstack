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
exports.LocalStrategy = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../serializer/constants");
const passport_1 = require("@nestjs/passport");
const passport_local_1 = require("passport-local");
const cqrs_1 = require("@nestjs/cqrs");
const dto_1 = require("../dto");
const cqrs_2 = require("../cqrs");
const nestjs_1 = require("@automapper/nestjs");
const class_transformer_1 = require("class-transformer");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, constants_1.LOCAL_STRATEGY) {
    constructor(commandBus, mapper) {
        super();
        this.commandBus = commandBus;
        this.mapper = mapper;
    }
    async validate(username, password) {
        const loginDto = (0, class_transformer_1.plainToInstance)(dto_1.LoginDto, { username, password });
        const user = await this.commandBus.execute(new cqrs_2.LoginUserCommand(loginDto));
        if (!user) {
            throw new common_1.UnauthorizedException('Error validating user.');
        }
        return user;
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, nestjs_1.InjectMapper)()),
    __metadata("design:paramtypes", [cqrs_1.CommandBus, Object])
], LocalStrategy);
//# sourceMappingURL=local.strategy.js.map