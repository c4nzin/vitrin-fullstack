import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public serializeUser(user: UserDocument, done: Function): void {
    done(null, user._id);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async deserializeUser(userId: string, done: Function): Promise<void> {
    // const user = await this.userRepository.findById(userId).select(`+password`);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return done(null, false);
    }
    done(null, user);
  }
}
