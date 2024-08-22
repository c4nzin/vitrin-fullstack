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
exports.BullService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config/config");
let BullService = class BullService {
    constructor(config) {
        this.config = config;
    }
    async createSharedConfiguration() {
        return {
            redis: {
                host: this.config.REDIS_HOST,
                port: this.config.REDIS_PORT,
            },
        };
    }
};
exports.BullService = BullService;
exports.BullService = BullService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.ENV)),
    __metadata("design:paramtypes", [Object])
], BullService);
//# sourceMappingURL=bull.service.js.map