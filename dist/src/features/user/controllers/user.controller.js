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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const dto_1 = require("../dto");
const cqrs_1 = require("@nestjs/cqrs");
const update_profile_command_1 = require("../cqrs/account/command/update-profile.command");
const authenticated_guard_1 = require("../../../common/guards/authenticated.guard");
const update_email_command_1 = require("../cqrs/account/command/update-email.command");
let UserController = class UserController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async getUser(user) {
        return user;
    }
    async updateProfile(id, updateProfile) {
        return this.commandBus.execute(new update_profile_command_1.UpdateProfileFieldsCommand(id, updateProfile));
    }
    async updateEmail(updateEmailDto, user) {
        return this.commandBus.execute(new update_email_command_1.UpdatEmailCommand(updateEmailDto, user));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, decorators_1.User)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('update-email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdateEmailDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEmail", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], UserController);
//# sourceMappingURL=user.controller.js.map