import { RegisteredUserJob } from '../types/registered-user.job';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateEmailJob } from '../types/update-email.job';
export declare const EMAIL_QUEUE = "email-queue";
export declare const USER_REGISTERED = "user-registered";
export declare const UPDATE_EMAIL = "update-email";
export declare class EmailService {
    private readonly emailService;
    constructor(emailService: MailerService);
    userRegistered(job: RegisteredUserJob): Promise<void>;
    updateEmail(job: UpdateEmailJob): Promise<void>;
}
