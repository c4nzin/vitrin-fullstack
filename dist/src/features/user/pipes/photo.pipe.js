"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoPipe = void 0;
const common_1 = require("@nestjs/common");
const file_type_validator_1 = require("../validators/file-type.validator");
exports.PhotoPipe = new common_1.ParseFilePipe({
    validators: [
        new common_1.MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
        new file_type_validator_1.FileTypeValidator({
            fileType: ['image/jpeg', 'image/png', 'image/jpg'],
        }),
    ],
});
//# sourceMappingURL=photo.pipe.js.map