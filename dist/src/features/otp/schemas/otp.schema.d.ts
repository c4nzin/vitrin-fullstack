import { HydratedDocument } from 'mongoose';
export type OtpDocument = HydratedDocument<OTP>;
export declare class OTP {
    otpCode: string;
    email: string;
    expiresAt: Date;
}
export declare const OtpSchema: import("mongoose").Schema<OTP, import("mongoose").Model<OTP, any, any, any, import("mongoose").Document<unknown, any, OTP> & OTP & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OTP, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<OTP>> & import("mongoose").FlatRecord<OTP> & {
    _id: import("mongoose").Types.ObjectId;
}>;
