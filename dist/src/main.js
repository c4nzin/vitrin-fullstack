"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const setup_app_1 = require("./setup-app");
const app_module_1 = require("./app.module");
const config_1 = require("./config/config");
const setup_swagger_1 = require("./setup-swagger");
const class_validator_1 = require("class-validator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ENV);
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    (0, setup_swagger_1.setupSwagger)(app);
    await (0, setup_app_1.setupApp)(app);
    await app.listen(config.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map