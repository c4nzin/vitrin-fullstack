import { Injectable } from '@nestjs/common';
import { BaseGuard } from './base.guard';
import { GOOGLE_STRATEGY } from 'src/features/auth/strategies/strategy.constants';

@Injectable()
export class GoogleGuard extends BaseGuard(GOOGLE_STRATEGY) {}
