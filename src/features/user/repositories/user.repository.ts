import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userRepository: Model<User>) {
    super(userRepository);
  }

  public async isCorrectPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isCorrectPassword = await bcrypt.compare(plainPassword, hashedPassword);

    if (!isCorrectPassword) {
      throw new BadRequestException('Passwords are not matching.');
    }

    return isCorrectPassword;
  }

  public async findByUsername(username: string): Promise<UserDocument> {
    const user = await this.findOne({ username });

    return user;
  }
  public async findByUsernameAndEmail(
    username: string,
    email: string,
  ): Promise<UserDocument> {
    const user = await this.findOne({ $or: [{ username }, { email }] });

    return user;
  }
}
