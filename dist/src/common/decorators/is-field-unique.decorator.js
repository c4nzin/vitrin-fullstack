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
exports.IsFieldUniqueDecorator = void 0;
exports.IsUserFieldUnique = IsUserFieldUnique;
const class_validator_1 = require("class-validator");
const repositories_1 = require("../../features/user/repositories");
let IsFieldUniqueDecorator = class IsFieldUniqueDecorator {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validate(value, validationArguments) {
        const [constraints] = validationArguments.constraints;
        const user = await this.userRepository.findOne({ [constraints]: value });
        if (!user) {
            return true;
        }
        else {
            return false;
        }
    }
    defaultMessage(args) {
        return `The field '${args.property}' is already taken.`;
    }
};
exports.IsFieldUniqueDecorator = IsFieldUniqueDecorator;
exports.IsFieldUniqueDecorator = IsFieldUniqueDecorator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: true, name: 'IsUserFieldUnique' }),
    __metadata("design:paramtypes", [repositories_1.UserRepository])
], IsFieldUniqueDecorator);
function IsUserFieldUnique(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            propertyName: propertyName,
            name: 'IsUserFieldUnique',
            constraints: [property],
            validator: IsFieldUniqueDecorator,
            options: validationOptions,
            target: object.constructor,
        });
    };
}
//# sourceMappingURL=is-field-unique.decorator.js.map