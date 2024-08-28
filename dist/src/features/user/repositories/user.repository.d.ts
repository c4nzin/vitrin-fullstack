import { BaseRepository } from 'src/core/repositories/base.repository';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
export declare class UserRepository extends BaseRepository<User> {
    private readonly userRepository;
    constructor(userRepository: Model<User>);
    isCorrectPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    findByUsername(username: string): Promise<UserDocument>;
    findByUsernameAndEmail(username: string, email: string): Promise<UserDocument>;
    isOldEmailCorrect(email: string): Promise<import("mongoose").Document<unknown, {}, User> & User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findFollowers(userId: string, pagination: Pagination): Promise<UserDocument[]>;
    getTweetsFromUser(id: string, pagination: Pagination): Promise<any[]>;
}
