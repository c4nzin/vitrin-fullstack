import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { User, UserDocument } from '../schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { Pagination } from 'src/common/decorators/types/pagination.interface';

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

  public async isOldEmailCorrect(email: string) {
    const user = await this.findOne({ email });

    return user;
  }
  public async findFollowers(
    userId: string,
    pagination: Pagination,
  ): Promise<UserDocument[]> {
    const query = { followedBy: userId };

    return this.find(query)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .sort(
        pagination.sort.reduce((acc, sort) => {
          acc[sort.field] = sort.by === 'ASC' ? 1 : -1;
          return acc;
        }, {}),
      )
      .exec();
  }

  public async getTweetsFromUser(id: string, pagination: Pagination): Promise<any[]> {
    const query = { userId: id };

    return this.find(query)
      .skip(pagination.skip)
      .limit(pagination.skip)
      .sort(
        pagination.sort.reduce((acc, sort) => {
          acc[sort.field] = sort.by === 'ASC' ? 1 : -1;
          return acc;
        }, {}),
      )
      .exec();
  }

  public countDocuments(query: FilterQuery<UserDocument>): Promise<any> {
    return this.userRepository.countDocuments(query);
  }
}
