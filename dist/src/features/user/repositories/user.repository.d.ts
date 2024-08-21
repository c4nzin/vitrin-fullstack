import { BaseRepository } from 'src/core/repositories/base.repository';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
export declare class UserRepository extends BaseRepository<User> {
    private readonly userRepository;
    constructor(userRepository: Model<User>);
    isCorrectPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    findByUsername(username: string): Promise<UserDocument>;
    findByUsernameAndEmail(username: string, email: string): Promise<UserDocument>;
}
