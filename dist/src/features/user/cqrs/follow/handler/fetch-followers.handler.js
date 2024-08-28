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
exports.FetchFollowersHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const fetch_followers_command_1 = require("../command/fetch-followers.command");
const repositories_1 = require("../../../repositories");
let FetchFollowersHandler = class FetchFollowersHandler {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(command) {
        const { id, pagination } = command;
        const user = await this.userRepository.findById(id);
        const followers = await this.userRepository.find({
            _id: { $in: user.follower },
        });
        const sortedFollowers = followers.sort((a, b) => {
            if (pagination.sort.length) {
                const sortField = pagination.sort[0].field;
                const sortOrder = pagination.sort[0].by;
                return sortOrder === 'ASC'
                    ? a[sortField].localeCompare(b[sortField])
                    : b[sortField].localeCompare(a[sortField]);
            }
            return 0;
        });
        const paginatedFollowers = sortedFollowers.slice(pagination.skip, pagination.skip + pagination.limit);
        return paginatedFollowers;
    }
};
exports.FetchFollowersHandler = FetchFollowersHandler;
exports.FetchFollowersHandler = FetchFollowersHandler = __decorate([
    (0, cqrs_1.CommandHandler)(fetch_followers_command_1.FetchFollowersCommand),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], FetchFollowersHandler);
//# sourceMappingURL=fetch-followers.handler.js.map