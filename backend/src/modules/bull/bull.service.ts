import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Inject, Injectable } from '@nestjs/common';
import { ENV, Config } from 'src/config/config';

@Injectable()
export class BullService implements SharedBullConfigurationFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public async createSharedConfiguration(): Promise<BullRootModuleOptions> {
    return {
      limiter: {
        duration: 60000,
        max: 1000,
      },
      settings: {},
      redis: {
        host: this.config.REDIS_HOST,
        port: this.config.REDIS_PORT,
      },
    };
  }
}
