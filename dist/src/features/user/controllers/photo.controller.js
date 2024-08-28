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
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const photo_pipe_1 = require("../pipes/photo.pipe");
const decorators_1 = require("../../../common/decorators");
const cqrs_1 = require("@nestjs/cqrs");
const upload_photo_command_1 = require("../cqrs/photo/command/upload-photo.command");
const authenticated_guard_1 = require("../../../common/guards/authenticated.guard");
let PhotoController = class PhotoController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async uploadProfilePhoto(file, id) {
        return this.commandBus.execute(new upload_photo_command_1.UploadPhotoCommand(file, id));
    }
    async updateProfilephoto(file, id) {
        return this.commandBus.execute(new upload_photo_command_1.UploadPhotoCommand(file, id));
    }
};
exports.PhotoController = PhotoController;
__decorate([
    (0, common_1.Post)('me/profile-photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(photo_pipe_1.PhotoPipe)),
    __param(1, (0, decorators_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "uploadProfilePhoto", null);
__decorate([
    (0, common_1.Put)('me/profile-photo'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(photo_pipe_1.PhotoPipe)),
    __param(1, (0, decorators_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "updateProfilephoto", null);
exports.PhotoController = PhotoController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(authenticated_guard_1.AuthenticatedGuard),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], PhotoController);
//# sourceMappingURL=photo.controller.js.map