import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { UserRepository } from 'src/features/user/repositories';
import { User } from 'src/features/user/schemas';
export declare class IsFieldUniqueConstraint implements ValidatorConstraintInterface {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    validate(value: string, validationArguments: ValidationArguments): Promise<boolean>;
    defaultMessage(args?: ValidationArguments): string;
}
export declare function IsUserFieldUnique(property: keyof User, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
