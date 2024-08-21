import { Observable } from 'rxjs';
import { Logger } from 'nestjs-pino';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown>;
    private logSuccess;
    private logError;
}
