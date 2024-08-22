import { BaseRepository } from 'src/core/repositories/base.repository';
import { OTP } from '../schemas';
import { Model } from 'mongoose';
import { UserRepository } from 'src/features/user/repositories';
export declare class OtpRepository extends BaseRepository<OTP> {
    private readonly otpRepository;
    private readonly userRepository;
    constructor(otpRepository: Model<OTP>, userRepository: UserRepository);
    findUserWithEmail(email: string): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas").User> & import("../../user/schemas").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
