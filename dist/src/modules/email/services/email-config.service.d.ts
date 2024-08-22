import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Config } from 'src/config/config';
export declare class EmailConfigService implements MailerOptionsFactory {
    private readonly config;
    constructor(config: Config);
    createMailerOptions(): Promise<MailerOptions>;
}
