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
exports.DeleteTweetCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const delete_tweet_command_1 = require("../command/delete-tweet.command");
const repositories_1 = require("../../../repositories");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
let DeleteTweetCommandHandler = class DeleteTweetCommandHandler {
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async execute(command) {
        const { user, id } = command;
        const postId = new mongoose_1.Types.ObjectId(id);
        const post = await this.postRepository.findById(id);
        if (!post) {
            throw new common_1.BadRequestException('No post found to remove.');
        }
        await this.userRepository.findByIdAndUpdate(user.id, {
            $pull: { posts: postId },
        });
        const deleteResult = await post.deleteOne();
        if (deleteResult.deletedCount === 0 || !deleteResult.acknowledged) {
            throw new common_1.BadRequestException('Failed to delete post.');
        }
        return deleteResult;
    }
};
exports.DeleteTweetCommandHandler = DeleteTweetCommandHandler;
exports.DeleteTweetCommandHandler = DeleteTweetCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(delete_tweet_command_1.DeleteTweetCommand),
    __metadata("design:paramtypes", [repositories_1.PostRepository,
        repositories_1.UserRepository])
], DeleteTweetCommandHandler);
//# sourceMappingURL=delete-tweet.handler.js.map