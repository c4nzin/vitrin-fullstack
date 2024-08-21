import { FilterQuery, Model, UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose';
import { CreateResult, DeleteResult, FindAllResult, FindResult, UpdateResult } from './types/query.types';
export declare class BaseRepository<T> {
    private readonly model;
    constructor(model: Model<T>);
    create(object: Partial<T>): Promise<CreateResult<T>>;
    find(query: FilterQuery<T>): FindAllResult<T>;
    findById(id: string): FindResult<T>;
    findByIdAndDelete(id: string): FindResult<T>;
    findByIdAndUpdate(id: string, update: UpdateWithAggregationPipeline | UpdateQuery<T>): FindResult<T>;
    findOne(filter: FilterQuery<T>): FindResult<T>;
    findOneAndDelete(filter: FilterQuery<T>): FilterQuery<T>;
    findOneAndUpdate(filter: FilterQuery<T>, update: UpdateWithAggregationPipeline | UpdateQuery<T>): FindResult<T>;
    updateMany(filter: FilterQuery<T>, object: UpdateWithAggregationPipeline | UpdateQuery<T>): UpdateResult<T>;
    updateOne(query: FilterQuery<T>, object: UpdateWithAggregationPipeline | UpdateQuery<T>): UpdateResult<T>;
    deleteMany(filter: FilterQuery<T>): DeleteResult<T>;
    deleteOne(filter: FilterQuery<T>): DeleteResult<T>;
}
