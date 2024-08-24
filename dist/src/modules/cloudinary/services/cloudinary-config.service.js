"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryConfigProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("../constants");
const config_1 = require("../../../config/config");
exports.CloudinaryConfigProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: (config) => {
        return cloudinary_1.v2.config({
            cloud_name: config.CLOUDINARY_CLOUD_NAME,
            api_key: config.CLOUDINARY_API_KEY,
            api_secret: config.CLOUDINARY_API_SECRET,
        });
    },
    inject: [config_1.ENV],
};
//# sourceMappingURL=cloudinary-config.service.js.map