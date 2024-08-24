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
exports.UploadPhotoCommandHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const upload_photo_command_1 = require("../command/upload-photo.command");
const cloudinary_service_1 = require("../../../../../modules/cloudinary/services/cloudinary.service");
const repositories_1 = require("../../../repositories");
let UploadPhotoCommandHandler = class UploadPhotoCommandHandler {
    constructor(cloudinaryService, userRepository) {
        this.cloudinaryService = cloudinaryService;
        this.userRepository = userRepository;
    }
    async execute(command) {
        const file = await this.cloudinaryService.uploadFile(command.file, {
            async: true,
            folder: 'users',
        });
        await this.userRepository.findByIdAndUpdate(command.id, {
            $set: { profilePicture: file.url },
        });
    }
};
exports.UploadPhotoCommandHandler = UploadPhotoCommandHandler;
exports.UploadPhotoCommandHandler = UploadPhotoCommandHandler = __decorate([
    (0, cqrs_1.CommandHandler)(upload_photo_command_1.UploadPhotoCommand),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService,
        repositories_1.UserRepository])
], UploadPhotoCommandHandler);
//# sourceMappingURL=upload-photo.handler.js.map