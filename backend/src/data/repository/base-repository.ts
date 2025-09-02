import { Document, Model, SaveOptions, Types } from "mongoose";

export class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  protected async save(
    data: Partial<T>,
    options: SaveOptions = {}
  ): Promise<T> {
    const instance = new this.model(data);
    const savedInstance = await instance.save(options);
    return savedInstance.toObject();
  }

  protected async getById(id: Types.ObjectId | string): Promise<T | null> {
    const instance = await this.model.findById(id);
    return instance ? instance.toObject() : null;
  }

  protected async deleteById(id: Types.ObjectId | string): Promise<T | null> {
    const deletedInstance = await this.model.findByIdAndDelete(id);
    return deletedInstance ? deletedInstance.toObject() : null;
  }

  protected async listByIds(ids: Types.ObjectId[] | string[]): Promise<T[]> {
    const instances = await this.model
      .find({
        _id: { $in: ids },
      })
      .exec();

    return instances.map((instance) => instance.toObject());
  }

  protected async updateById(
    id: Types.ObjectId | string,
    data: Partial<T>,
    options: { new?: boolean } = { new: true }
  ): Promise<T | null> {
    const updatedInstance = await this.model
      .findByIdAndUpdate(id, data, { ...options })
      .exec();

    return updatedInstance ? updatedInstance.toObject() : null;
  }
}
