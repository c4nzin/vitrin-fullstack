import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { GOOGLE_STRATEGY } from './strategy.constants';
import { ENV, Config } from 'src/config/config';
import { UserRepository } from 'src/features/user/repositories';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, GOOGLE_STRATEGY) {
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly userRepository: UserRepository,
  ) {
    super({
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      session: true,
    });
  }

  public async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    const { id, displayName, name, photos, emails } = profile;

    let user = await this.userRepository.findOne({ googleID: id });

    if (!user) {
      user = await this.userRepository.create({
        email: emails[0].value,
        username: displayName,
        fullName: this.fullNameConverter(name.givenName, name.familyName),
        profilePicture: photos[0].value,
        googleID: id,
      });
    }

    done(null, user);
  }

  private fullNameConverter(firstName: string, lastName: string): string {
    return firstName && !lastName ? firstName : `${firstName} ${lastName}`;
  }
}
