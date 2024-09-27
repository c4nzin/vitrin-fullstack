import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailConfigService } from './services/email-config.service';
import { EmailService } from './services';

@Module({
  imports: [MailerModule.forRootAsync({ useClass: EmailConfigService })],
  providers: [EmailService],
})
export class EmailModule {}
