import { HydratedDocument, Types } from 'mongoose';
export type UserDocument = HydratedDocument<User>;
export declare enum Gender {
    MALE = 0,
    FEMALE = 1,
    NON_BINARY = 2,
    NOT_KNOWN = 3
}
export declare class User {
    username: string;
    password: string;
    email: string;
    gender: number;
    isEmailVerified: boolean;
    GOOGLE_ID: string;
    hasPassword: boolean;
    bio: string;
    birthDay: Date | null;
    profilePicture: string;
    website: string;
    thumbnail: string;
    follow: Types.ObjectId[];
    follower: Types.ObjectId[];
    posts: Types.ObjectId[];
    blockeduser: Types.ObjectId[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
