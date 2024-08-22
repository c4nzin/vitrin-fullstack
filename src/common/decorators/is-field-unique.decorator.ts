import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/features/user/repositories';
import { User } from 'src/features/user/schemas';

@ValidatorConstraint({ async: true, name: 'IsUserFieldUnique' })
export class IsFieldUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly userRepository: UserRepository) {}

  public async validate(
    value: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const [constraints] = validationArguments.constraints;

    const user = await this.userRepository.findOne({ [constraints]: value });

    return !user;
  }
  public defaultMessage(args?: ValidationArguments): string {
    return `The field '${args.property}' is already taken.`;
  }
}

export function IsUserFieldUnique(
  property: keyof User,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      propertyName: propertyName,
      name: 'IsUserFieldUnique',
      constraints: [property],
      validator: IsFieldUniqueConstraint,
      options: validationOptions,
      target: object.constructor,
    });
  };
}
