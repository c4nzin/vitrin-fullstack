import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { OTP } from '../schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/features/user/repositories';

@Injectable()
export class OtpRepository extends BaseRepository<OTP> {
  constructor(
    @InjectModel(OTP.name) private readonly otpRepository: Model<OTP>,
    private readonly userRepository: UserRepository,
  ) {
    super(otpRepository);
  }

  public async findUserWithEmail(email: string) {
    const user = await this.userRepository.findOne({ email });

    return user;
  }
}
