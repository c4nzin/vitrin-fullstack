import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { HydratedDocument, Types } from 'mongoose';
import { Gender } from './enum/gender.enum';

//add thumbnail
//add follow
//add follower
//add posts
//add location

//*** no needed but good to having those */
//add blockeduser
export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  collection: 'User',
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
    required: false,
    maxlength: 255,
  })
  public bio: string;

  @Prop({
    type: Date,
  })
  public birthDay: Date | null;

  @Prop({
    type: String,
    default: process.env.PROFILE_PICTURE_URL,
    select: true,
  })
  public profilePicture: string;

  @Prop({
    type: String,
    validate: {
      validator: (url: string) => validator.isURL(url),
    },
  })
  public website: string;

  @Prop({
    type: String,
    default: process.env.THUMBNAIL_URL,
  })
  public thumbnail: string;

  @Prop({
    type: [Types.ObjectId],
    default: [],
  })
  public follow: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    default: [],
  })
  public follower: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'Post',
    default: [],
  })
  public posts: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  public blockeduser: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'User',
    default: [],
  })
  public friends: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'FriendRequest',
    default: [],
  })
  public sentFriendRequests: Types.ObjectId[];

  @Prop({
    type: [Types.ObjectId],
    ref: 'FriendRequest',
    default: [],
  })
  public receivedFriendRequests: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass<User>(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
