import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';
export declare class ThrottlerConfigService implements ThrottlerOptionsFactory {
    createThrottlerOptions(): Promise<ThrottlerModuleOptions>;
}
