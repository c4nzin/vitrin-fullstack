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
exports.LoggingInterceptor = void 0;
const rxjs_1 = require("rxjs");
const nestjs_pino_1 = require("nestjs-pino");
const common_1 = require("@nestjs/common");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const { method, url } = context.switchToHttp().getRequest();
        const message = `Incoming request - ${method} - ${url}`;
        this.logger.log(message);
        return next.handle().pipe((0, rxjs_1.tap)({
            next: () => this.logSuccess(context),
            error: (error) => this.logError(error, context),
        }));
    }
    logSuccess(context) {
        const { method, url } = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const message = `Outgoing response - ${statusCode} - ${method} - ${url}`;
        this.logger.log(message);
    }
    logError(error, context) {
        const { method, url } = context.switchToHttp().getRequest();
        if (!(error instanceof common_1.HttpException)) {
            const message = `Outgoing response - ${method} - ${url}`;
            return this.logger.error(message, error.stack);
        }
        const statusCode = error.getStatus();
        const message = `Outgoing response - ${statusCode} - ${method} - ${url}`;
        if (statusCode >= common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            return this.logger.error(message, error.stack);
        }
        this.logger.warn(message, error);
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map