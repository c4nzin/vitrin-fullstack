"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const repositories_1 = require("./repositories");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("./schemas/");
const controllers_1 = require("./controllers");
const cloudinary_module_1 = require("../../modules/cloudinary/cloudinary.module");
const upload_photo_handler_1 = require("./cqrs/photo/handler/upload-photo.handler");
const cqrs_1 = require("@nestjs/cqrs");
const update_profile_handler_1 = require("./cqrs/account/handler/update-profile.handler");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: schemas_1.User.name, schema: schemas_1.UserSchema }]),
            cloudinary_module_1.CloudinaryModule,
            cqrs_1.CqrsModule,
        ],
        controllers: [controllers_1.PhotoController, controllers_1.UserController],
        providers: [
            repositories_1.UserRepository,
            upload_photo_handler_1.UploadPhotoCommandHandler,
            update_profile_handler_1.UpdateProfileFieldsCommandHandler,
        ],
        exports: [repositories_1.UserRepository, upload_photo_handler_1.UploadPhotoCommandHandler, update_profile_handler_1.UpdateProfileFieldsCommandHandler],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map