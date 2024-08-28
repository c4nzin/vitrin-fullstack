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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../../../common/decorators");
const cqrs_1 = require("@nestjs/cqrs");
const follow_command_1 = require("../cqrs/follow/command/follow.command");
const unfollow_command_1 = require("../cqrs/follow/command/unfollow.command");
const fetch_followers_command_1 = require("../cqrs/follow/command/fetch-followers.command");
const guards_1 = require("../../../common/guards");
let FollowController = class FollowController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async follow(user, id) {
        return this.commandBus.execute(new follow_command_1.FollowCommand(user, id));
    }
    async unfollow(user, id) {
        return this.commandBus.execute(new unfollow_command_1.UnfollowCommand(user, id));
    }
    async getFollowers(id, pagination) {
        return this.commandBus.execute(new fetch_followers_command_1.FetchFollowersCommand(id, pagination));
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)(':id/follow'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "follow", null);
__decorate([
    (0, common_1.Delete)(':id/unfollow'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollow", null);
__decorate([
    (0, common_1.Get)(':id/followers'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.Paginate)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "getFollowers", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(guards_1.AuthenticatedGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], FollowController);
//# sourceMappingURL=follow.controller.js.map