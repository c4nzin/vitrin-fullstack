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
exports.PostSchema = exports.Post = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Post.prototype, "author", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.Types.ObjectId],
        ref: 'User',
        default: [],
    }),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        minlength: 3,
        maxlength: 255,
        required: true,
    }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], Post.prototype, "media", void 0);
exports.Post = Post = __decorate([
    (0, mongoose_1.Schema)({
        versionKey: false,
        collection: 'Post',
    })
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);
//# sourceMappingURL=post.schema.js.map