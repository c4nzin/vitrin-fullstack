import { Injectable } from '@nestjs/common';
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from '@nestjs/throttler';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  public async createThrottlerOptions(): Promise<ThrottlerModuleOptions> {
    return {
      throttlers: [{ ttl: 6000, limit: 10 }],
    };
  }
}
