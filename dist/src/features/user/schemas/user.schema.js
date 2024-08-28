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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.Gender = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_2 = require("mongoose");
var Gender;
(function (Gender) {
    Gender[Gender["MALE"] = 0] = "MALE";
    Gender[Gender["FEMALE"] = 1] = "FEMALE";
    Gender[Gender["NON_BINARY"] = 2] = "NON_BINARY";
    Gender[Gender["NOT_KNOWN"] = 3] = "NOT_KNOWN";
})(Gender || (exports.Gender = Gender = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        minlength: 3,
        maxlength: 15,
        validate: {
            validator: (username) => validator_1.default.isAlphanumeric(username),
        },
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        minlength: 6,
        maxlength: 20,
        validate: {
            validator: (password) => validator_1.default.isStrongPassword(password),
        },
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        validate: {
            validator: (email) => validator_1.default.isEmail(email),
        },
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
        default: Gender.NOT_KNOWN,
    }),
    __metadata("design:type", Number)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        required: true,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "GOOGLE_ID", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        required: true,
        default: function () {
            return this.password !== undefined;
        },
    }),
    __metadata("design:type", Boolean)
], User.prototype, "hasPassword", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: false,
        maxlength: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
    }),
    __metadata("design:type", Date)
], User.prototype, "birthDay", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: process.env.PROFILE_PICTURE_URL,
        select: true,
    }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        validate: {
            validator: (url) => validator_1.default.isURL(url),
        },
    }),
    __metadata("design:type", String)
], User.prototype, "website", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        default: process.env.THUMBNAIL_URL,
    }),
    __metadata("design:type", String)
], User.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "follow", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "follower", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'Post',
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'User',
        default: [],
    }),
    __metadata("design:type", Array)
], User.prototype, "blockeduser", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        collection: 'User',
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    this.hasPassword = true;
    next();
});
//# sourceMappingURL=user.schema.js.map