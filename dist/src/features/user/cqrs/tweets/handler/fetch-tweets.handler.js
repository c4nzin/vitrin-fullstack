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
exports.FetchTweetsCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const fetch_tweets_command_1 = require("../command/fetch-tweets.command");
const repositories_1 = require("../../../repositories");
const common_1 = require("@nestjs/common");
let FetchTweetsCommandHandler = class FetchTweetsCommandHandler {
    constructor(postRepository, userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }
    async execute(command) {
        const { id, pagination } = command;
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('No user found.');
        }
        const tweets = await this.postRepository.find({
            _id: { $in: user.posts },
        });
        const sortedTweets = tweets.sort((a, b) => {
            if (pagination.sort.length) {
                const sortField = pagination.sort[0].field;
                const sortOrder = pagination.sort[0].by;
                return sortOrder === 'ASC'
                    ? a[sortField].localeCompare(b[sortField])
                    : b[sortField].localeCompare(a[sortField]);
            }
            return 0;
        });
        const paginatedTweets = sortedTweets.slice(pagination.skip, pagination.skip + pagination.limit);
        return paginatedTweets;
    }
};
exports.FetchTweetsCommandHandler = FetchTweetsCommandHandler;
exports.FetchTweetsCommandHandler = FetchTweetsCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(fetch_tweets_command_1.FetchTweetsCommand),
    __metadata("design:paramtypes", [repositories_1.PostRepository,
        repositories_1.UserRepository])
], FetchTweetsCommandHandler);
//# sourceMappingURL=fetch-tweets.handler.js.map