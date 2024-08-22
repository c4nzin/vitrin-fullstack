import { RegisteredUserJob } from '../types/registered-user.job';
import { MailerService } from '@nestjs-modules/mailer';
export declare const EMAIL_QUEUE = "email-queue";
export declare const USER_REGISTERED = "user-registered";
export declare class EmailService {
    private readonly emailService;
    constructor(emailService: MailerService);
    userRegistered(job: RegisteredUserJob): Promise<void>;
}
