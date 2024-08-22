import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull';
import { Config } from 'src/config/config';
export declare class BullService implements SharedBullConfigurationFactory {
    private readonly config;
    constructor(config: Config);
    createSharedConfiguration(): Promise<BullRootModuleOptions>;
}
