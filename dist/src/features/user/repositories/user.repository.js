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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_repository_1 = require("../../../core/repositories/base.repository");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor(userRepository) {
        super(userRepository);
        this.userRepository = userRepository;
    }
    async isCorrectPassword(plainPassword, hashedPassword) {
        const isCorrectPassword = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        if (!isCorrectPassword) {
            throw new common_1.BadRequestException('Passwords are not matching.');
        }
        return isCorrectPassword;
    }
    async findByUsername(username) {
        const user = await this.findOne({ username });
        return user;
    }
    async findByUsernameAndEmail(username, email) {
        const user = await this.findOne({ $or: [{ username }, { email }] });
        return user;
    }
    async isOldEmailCorrect(email) {
        const user = await this.findOne({ email });
        return user;
    }
    async findFollowers(userId, pagination) {
        const query = { followedBy: userId };
        return this.find(query)
            .skip(pagination.skip)
            .limit(pagination.limit)
            .sort(pagination.sort.reduce((acc, sort) => {
            acc[sort.field] = sort.by === 'ASC' ? 1 : -1;
            return acc;
        }, {}))
            .exec();
    }
    async getTweetsFromUser(id, pagination) {
        const query = { userId: id };
        return this.find(query)
            .skip(pagination.skip)
            .limit(pagination.skip)
            .sort(pagination.sort.reduce((acc, sort) => {
            acc[sort.field] = sort.by === 'ASC' ? 1 : -1;
            return acc;
        }, {}))
            .exec();
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
//# sourceMappingURL=user.repository.js.map