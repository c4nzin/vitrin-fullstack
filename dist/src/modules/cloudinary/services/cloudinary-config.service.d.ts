import { Config } from 'src/config/config';
export declare const CloudinaryConfigProvider: {
    provide: string;
    useFactory: (config: Config) => import("cloudinary").ConfigOptions;
    inject: string[];
};
