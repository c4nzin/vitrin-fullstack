import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Payload } from 'src/common/interfaces/payload.interface';
export declare class TransformInterceptor<T> implements NestInterceptor<T, Payload<T>> {
    private readonly reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Payload<T>>;
    private transformResponse;
}
