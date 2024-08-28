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
exports.LikeTweetCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const like_tweet_command_1 = require("../command/like-tweet.command");
const repositories_1 = require("../../../repositories");
const common_1 = require("@nestjs/common");
let LikeTweetCommandHandler = class LikeTweetCommandHandler {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async execute(command) {
        const { id, user } = command;
        const tweet = await this.postRepository.findById(id);
        if (!tweet) {
            throw new common_1.BadRequestException('No tweet found.');
        }
        if (tweet.likes.includes(user.id)) {
            throw new common_1.BadRequestException('You already liked this tweet.');
        }
        tweet.likes.push(user.id);
        await tweet.save();
        return tweet;
    }
};
exports.LikeTweetCommandHandler = LikeTweetCommandHandler;
exports.LikeTweetCommandHandler = LikeTweetCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(like_tweet_command_1.LikeTweetCommand),
    __metadata("design:paramtypes", [repositories_1.PostRepository])
], LikeTweetCommandHandler);
//# sourceMappingURL=like-tweet.handler.js.map