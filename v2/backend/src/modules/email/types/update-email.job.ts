import { Job } from 'bullmq';

export type UpdateEmailJob = Job<{ otp: string; email: string }>;
