import {
  AggregateOptions,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import {
  CreateResult,
  DeleteResult,
  FindAllResult,
  FindResult,
  UpdateResult,
} from './types/query.types';
import { Pagination } from 'src/common/decorators/types/pagination.interface';
import { BadRequestException } from '@nestjs/common';
import { createPaginatedResult } from 'src/utils/create-paginated.result';

//burasi yeni paginationum klasorlere tasimayi unutma.
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 'asc' | 'desc'>;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
}

export class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  public async create(object: Partial<T>, session?: any): Promise<CreateResult<T>> {
    return this.model.create(object);
  }

  public find(query: FilterQuery<T>): FindAllResult<T> {
    return this.model.find(query);
  }

  public findById(id: string): FindResult<T> {
    return this.model.findById(id);
  }

  public findByIdAndDelete(id: string): FindResult<T> {
    return this.model.findByIdAndDelete(id);
  }

  public findByIdAndUpdate(
    id: string,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): FindResult<T> {
    return this.model.findByIdAndUpdate(id, update, { new: true });
  }

  public findOne(filter: FilterQuery<T>): FindResult<T> {
    return this.model.findOne(filter);
  }

  public findOneAndDelete(filter: FilterQuery<T>): FilterQuery<T> {
    return this.model.findOneAndDelete(filter);
  }

  public findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): FindResult<T> {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      setDefaultsOnInsert: true,
    });
  }

  public updateMany(
    filter: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): UpdateResult<T> {
    return this.model.updateMany(filter, object, { new: true });
  }

  public updateOne(
    query: FilterQuery<T>,
    object: UpdateWithAggregationPipeline | UpdateQuery<T>,
  ): UpdateResult<T> {
    return this.model.updateOne(query, object);
  }

  public deleteMany(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteMany(filter);
  }

  public deleteOne(filter: FilterQuery<T>): DeleteResult<T> {
    return this.model.deleteOne(filter);
  }

  public countDocuments<T>(filter: FilterQuery<T>): FilterQuery<T> {
    return this.model.countDocuments(filter).exec();
  }

  public paginatedResult(condition: string, pagination: Pagination): Promise<any> {
    const query = { condition };

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

  public async paginate(
    filter: FilterQuery<T> = {},
    options: PaginationOptions = {},
  ): Promise<PaginatedResult<T>> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;

    const recordsQuery = this.model.find(filter);

    const [records, total] = await Promise.all([
      recordsQuery.sort(options.sort).skip(skip).limit(limit).exec(),
      recordsQuery.countDocuments(filter).exec(),
    ]);

    return createPaginatedResult(records, total, page, limit);
  }

  public async executeTransaction(
    operations: (session: any) => Promise<any>,
  ): Promise<any> {
    const session = await this.model.db.startSession();
    session.startTransaction();

    try {
      const result = await operations(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException('Transaction failed.', error.message);
    } finally {
      session.endSession();
    }
  }

  public aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<any[]> {
    return this.model.aggregate(pipeline).option(options);
  }
}
