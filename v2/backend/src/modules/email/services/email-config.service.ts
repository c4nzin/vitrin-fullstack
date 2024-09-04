import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

//TODO : GEREKLİ MAİL KISIMLARINI EKLE VERİYFY PASSWORD FALAN

@Injectable()
export class EmailConfigService implements MailerOptionsFactory {
  constructor(@Inject(ENV) private readonly config: Config) {}

  public async createMailerOptions(): Promise<MailerOptions> {
    return {
      transport: {
        host: this.config.MAIL_HOST,
        port: this.config.MAIL_PORT,
        auth: {
          user: this.config.MAIL,
          pass: this.config.MAIL_PASSWORD,
        },

        secure: false,
        service: 'gmail',
        tls: { rejectUnauthorized: false },
      },
      defaults: {
        from: `"nexus" <${this.config.MAIL}>`,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        dir: join(__dirname + 'templates'),
      },
    };
  }
}
