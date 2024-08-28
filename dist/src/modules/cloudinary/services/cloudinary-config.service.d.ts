import { ConfigOptions } from 'cloudinary';
import { Config } from 'src/config/config';
export declare const CloudinaryConfigProvider: {
    provide: string;
    useFactory: (config: Config) => ConfigOptions;
    inject: string[];
};
