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
exports.FollowCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const follow_command_1 = require("../command/follow.command");
const repositories_1 = require("../../../repositories");
const common_1 = require("@nestjs/common");
let FollowCommandHandler = class FollowCommandHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        await this.checkIfTargetUserValid(command.targetId);
        await this.userRepository.findByIdAndUpdate(command.user.id, {
            $push: { follow: command.targetId },
        });
        await this.userRepository.findByIdAndUpdate(command.targetId, {
            $push: { follower: command.user.id },
        });
    }
    async checkIfTargetUserValid(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('No user found to follow!');
        }
        return user;
    }
};
exports.FollowCommandHandler = FollowCommandHandler;
exports.FollowCommandHandler = FollowCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(follow_command_1.FollowCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], FollowCommandHandler);
//# sourceMappingURL=follow.handler.js.map