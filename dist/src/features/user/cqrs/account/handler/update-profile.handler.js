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
exports.UpdateProfileFieldsCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const update_profile_command_1 = require("../command/update-profile.command");
const repositories_1 = require("../../../repositories");
let UpdateProfileFieldsCommandHandler = class UpdateProfileFieldsCommandHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        return this.userRepository.findByIdAndUpdate(command.id, {
            $set: {
                bio: command.updateProfileDto.bio,
                gender: command.updateProfileDto.gender,
                username: command.updateProfileDto.username,
                website: command.updateProfileDto.website,
            },
        });
    }
};
exports.UpdateProfileFieldsCommandHandler = UpdateProfileFieldsCommandHandler;
exports.UpdateProfileFieldsCommandHandler = UpdateProfileFieldsCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_profile_command_1.UpdateProfileFieldsCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], UpdateProfileFieldsCommandHandler);
//# sourceMappingURL=update-profile.handler.js.map