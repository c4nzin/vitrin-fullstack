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
exports.CreateTweetCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const create_tweet_command_1 = require("../command/create-tweet.command");
const repositories_1 = require("../../../repositories");
const cloudinary_service_1 = require("../../../../../modules/cloudinary/services/cloudinary.service");
let CreateTweetCommandHandler = class CreateTweetCommandHandler {
    constructor(postRepository, cloudinaryService) {
        this.postRepository = postRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async execute(command) {
        const { createPost, user, file } = command;
        const mediaUrl = await this.uploadMedia(file);
        const createdPost = await this.postRepository.create({
            author: user._id,
            content: createPost.content,
            media: mediaUrl,
        });
        await user.updateOne({ $push: { posts: createdPost._id } });
        return createdPost;
    }
    async uploadMedia(file) {
        if (file) {
            const uploadedMedia = await this.cloudinaryService.uploadFile(file, {
                folder: 'media',
            });
            return uploadedMedia.url || uploadedMedia.secure_url;
        }
        return;
    }
};
exports.CreateTweetCommandHandler = CreateTweetCommandHandler;
exports.CreateTweetCommandHandler = CreateTweetCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_tweet_command_1.CreateTweetCommand),
    __metadata("design:paramtypes", [repositories_1.PostRepository,
        cloudinary_service_1.CloudinaryService])
], CreateTweetCommandHandler);
//# sourceMappingURL=create-tweet.handler.js.map