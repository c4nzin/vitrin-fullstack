import { HydratedDocument, Types } from 'mongoose';
export type PostDocument = HydratedDocument<Post>;
export declare class Post {
    author: Types.ObjectId;
    likes: Types.ObjectId[];
    content: string;
    media: string;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, import("mongoose").Document<unknown, any, Post> & Post & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Post>> & import("mongoose").FlatRecord<Post> & {
    _id: Types.ObjectId;
}>;
