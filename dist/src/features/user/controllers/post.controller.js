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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const decorators_1 = require("../../../common/decorators");
const dto_1 = require("../dto");
const platform_express_1 = require("@nestjs/platform-express");
const pipes_1 = require("../pipes");
const cqrs_2 = require("../cqrs");
const guards_1 = require("../../../common/guards");
let PostController = class PostController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async createPost(user, createPost, uploadedMedia) {
        return this.commandBus.execute(new cqrs_2.CreateTweetCommand(user, createPost, uploadedMedia));
    }
    async deletePost(user, id) {
        return this.commandBus.execute(new cqrs_2.DeleteTweetCommand(user, id));
    }
    async fetchTweets(id, paginate) {
        return this.commandBus.execute(new cqrs_2.FetchTweetsCommand(id, paginate));
    }
    async likeTweet(user, id) {
        return this.commandBus.execute(new cqrs_2.LikeTweetCommand(user, id));
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(pipes_1.TweetPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)(':id/tweets'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_1.Paginate)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "fetchTweets", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    __param(0, (0, decorators_1.User)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likeTweet", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('tweets'),
    (0, common_1.UseGuards)(guards_1.AuthenticatedGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], PostController);
//# sourceMappingURL=post.controller.js.map