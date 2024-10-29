import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/repositories/base.repository';
import { Explore } from '../schemas/explore.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ExploreRepository extends BaseRepository<Explore> {
  constructor(@InjectModel(Explore.name) private readonly exploreModel: Model<Explore>) {
    super(exploreModel);
  }
}
