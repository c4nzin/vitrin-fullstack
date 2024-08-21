"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGuard = BaseGuard;
const passport_1 = require("@nestjs/passport");
function BaseGuard(type) {
    return class extends (0, passport_1.AuthGuard)(type) {
        async canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const result = await super.canActivate(context);
            await super.logIn(request);
            return !!result;
        }
    };
}
//# sourceMappingURL=base.guard.js.map