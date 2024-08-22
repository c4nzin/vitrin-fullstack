import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { HydratedDocument } from 'mongoose';

//add thumbnail
//add photo
//add follow
//add follower
//add posts
//add bio DONE
//add website
//add location
//add birthday DONE
//add isVerified DONE

//*** no needed but good to having those */
//add blockeduser
//add role
export type UserDocument = HydratedDocument<User>;

export enum Gender {
  MALE,
  FEMALE,
  NON_BINARY,
  NOT_KNOWN,
}

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    type: String,
    minlength: 3,
    maxlength: 15,
    validate: {
      validator: (username: string) => validator.isAlphanumeric(username),
    },
  })
  public username: string;

  @Prop({
    required: true,
    type: String,
    minlength: 6,
    maxlength: 20,
    validate: {
      //maybe i would want to change strong password checker in advance.
      validator: (password: string) => validator.isStrongPassword(password),
    },
  })
  public password: string;

  @Prop({
    required: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
    },
  })
  public email: string;

  @Prop({
    required: true,
    type: Number,
    default: Gender.NOT_KNOWN,
  })
  public gender: number;

  @Prop({
    type: Boolean,
    required: true,
    default: false,
  })
  public isEmailVerified: boolean;

  @Prop({
    type: String,
  })
  public GOOGLE_ID: string;

  @Prop({
    type: Boolean,
    required: true,
    default: function () {
      return this.password !== undefined;
    },
  })
  public hasPassword: boolean;

  @Prop({
    type: String,
    required: false,
    maxlength: 255,
  })
  public bio: string;

  @Prop({
    type: Date,
  })
  public birthDay: Date | null;
}

export const UserSchema = SchemaFactory.createForClass<User>(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.hasPassword = true;
  next();
});
