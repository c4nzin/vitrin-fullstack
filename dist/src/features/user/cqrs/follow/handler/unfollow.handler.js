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
exports.UnfollowCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const unfollow_command_1 = require("../command/unfollow.command");
const repositories_1 = require("../../../repositories");
let UnfollowCommandHandler = class UnfollowCommandHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        await this.userRepository.findByIdAndUpdate(command.id, {
            $pull: { follower: command.user.id },
        });
        await this.userRepository.findByIdAndUpdate(command.user.id, {
            $pull: { follow: command.id },
        });
    }
};
exports.UnfollowCommandHandler = UnfollowCommandHandler;
exports.UnfollowCommandHandler = UnfollowCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(unfollow_command_1.UnfollowCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], UnfollowCommandHandler);
//# sourceMappingURL=unfollow.handler.js.map