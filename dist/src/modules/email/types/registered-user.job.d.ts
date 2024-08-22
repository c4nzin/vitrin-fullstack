import { Job } from 'bull';
export type RegisteredUserJob = Job<{
    email: string;
    username: string;
    otp: string;
}>;
