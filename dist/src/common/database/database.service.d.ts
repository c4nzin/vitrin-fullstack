import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { Config } from 'src/config/config';
export declare class DatabaseConfigService implements MongooseOptionsFactory {
    private readonly config;
    constructor(config: Config);
    createMongooseOptions(): Promise<MongooseModuleOptions>;
}
