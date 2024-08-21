"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = setupApp;
const core_1 = require("@nestjs/core");
const config_1 = require("./config/config");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const validation_pipe_1 = require("./core/pipes/validation.pipe");
const http_exception_filter_1 = require("./core/filters/http-exception.filter");
const transform_interceptor_1 = require("./core/interceptors/transform.interceptor");
const nestjs_pino_1 = require("nestjs-pino");
const logging_interceptor_1 = require("./core/interceptors/logging.interceptor");
const passport_1 = __importDefault(require("passport"));
async function setupApp(app) {
    const config = app.get(config_1.ENV);
    app.use((0, express_session_1.default)({
        cookie: {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
        secret: config.SESSION_SECRET,
        name: 'sessionId',
        resave: false,
        saveUninitialized: false,
        store: connect_mongo_1.default.create({ mongoUrl: config.DB_URI }),
    }));
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor(new core_1.Reflector()));
    if (config.isDev) {
        const logger = app.get(nestjs_pino_1.Logger);
        app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor(logger));
    }
    app.setGlobalPrefix(config.GLOBAL_PREFIX);
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
}
//# sourceMappingURL=setup-app.js.map