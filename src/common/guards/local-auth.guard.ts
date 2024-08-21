import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { LOCAL_STRATEGY } from 'src/features/auth/serializer/constants';

@Injectable()
export class LocalAuthGuard extends BaseGuard(LOCAL_STRATEGY) {}
