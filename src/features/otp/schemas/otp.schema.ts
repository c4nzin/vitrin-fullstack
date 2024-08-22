import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

export type OtpDocument = HydratedDocument<OTP>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
  versionKey: false,
})
export class OTP {
  @Prop({
    type: String,
    minlength: 6,
    maxlength: 6,
  })
  public otpCode: string;

  @Prop({
    type: String,
    validate: {
      validator: (email: string) => validator.isEmail(email),
    },
  })
  public email: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: '1m',
  })
  public expiresAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass<OTP>(OTP);
