"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("./config/config");
const package_json_1 = require("../package.json");
function setupSwagger(app) {
    const config = app.get(config_1.ENV);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(package_json_1.name)
        .setVersion(package_json_1.version)
        .setDescription('Nexus api official documentation')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/', app, document);
    swagger_1.SwaggerModule.setup(config.GLOBAL_PREFIX, app, document);
}
//# sourceMappingURL=setup-swagger.js.map