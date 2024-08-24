"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThrottlerConfigService = void 0;
const common_1 = require("@nestjs/common");
let ThrottlerConfigService = class ThrottlerConfigService {
    async createThrottlerOptions() {
        return {
            throttlers: [{ ttl: 6000, limit: 10 }],
        };
    }
};
exports.ThrottlerConfigService = ThrottlerConfigService;
exports.ThrottlerConfigService = ThrottlerConfigService = __decorate([
    (0, common_1.Injectable)()
], ThrottlerConfigService);
//# sourceMappingURL=throttler-config.service.js.map