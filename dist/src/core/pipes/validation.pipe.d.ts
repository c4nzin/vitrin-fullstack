import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ValidationPipe implements PipeTransform {
    transform<T>(value: T, { metatype }: ArgumentMetadata): Promise<T>;
    private toValidate;
}
