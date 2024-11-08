import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from '@arendajaelu/nestjs-passport-apple';
import { APPLE_STRATEGY } from '../serializer/constants';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, APPLE_STRATEGY) {
  constructor() {
    super();
  }
}
