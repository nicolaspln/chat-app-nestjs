import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<T extends AbstractEntity> {
  protected abstract readonly logger: Logger;

  constructor(public readonly model: Model<T>) {}

  async create(document: Omit<T, '_id'>): Promise<T> {
    const createdDocument = new this.model(document);
    return createdDocument.save();
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection?: ProjectionType<T | null | undefined>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return this.model
      .find(filterQuery, projection, options)
      .lean()
      .exec() as Promise<T[]>;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean().exec();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as T;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(
        filterQuery,
        // update,
        { ...update, updatedAt: new Date() },
        {
          lean: true,
          new: true,
          omitUndefined: true, // Add this line to omit undefined properties
        },
      )
      .exec();

    if (!document) {
      this.logger.warn('Document was not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as T;
  }

  async findOneAndDelete(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOneAndDelete(filterQuery).lean().exec() as Promise<T>;
  }
}
