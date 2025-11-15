// src/shared/repositories/BaseRepository.ts
import { Model, Document } from "mongoose";
import { IBaseRepository } from "./interfaces/IBaseRepository";
import { IMapper } from "../mappers/IMapper";

export class BaseRepository<TDomain, TDocument extends Document>
  implements IBaseRepository<TDomain>
{
  constructor(
    protected readonly model: Model<TDocument>,
    protected readonly mapper: IMapper<TDomain, TDocument>
  ) {}

  async create(data: Partial<TDomain>): Promise<TDomain> {
    console.log("before Persist", data)
    const persistence = this.mapper.toPersistence(data);
    console.log("after Persist", persistence)
    const doc = await this.model.create(persistence);
    return this.mapper.toDomain(doc);
  }

  async findById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id).lean<TDocument | null>();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findOne(
    query: Record<string, Partial<TDocument>>
  ): Promise<TDomain | null> {
    const doc = await this.model.findOne(query).lean<TDocument | null>();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async find(
    query: Record<string, Partial<TDocument>> = {},
    projection: Partial<Record<keyof TDocument, number>> = {},
    options?: { limit?: number; sort?: Record<string, 1 | -1> }
  ): Promise<TDomain[]> {
    const docs = await this.model
      .find(query, projection)
      .limit(options?.limit ?? 0)
      .sort(options?.sort ?? {})
      .lean<TDocument[]>();

    return docs.map((doc) => this.mapper.toDomain(doc));
  }

  async update(id: string, data: Partial<TDomain>): Promise<TDomain | null> {
    console.log("before Persist", data)
    const persistence = this.mapper.toPersistence({ ...data, id });
    console.log("after Persist", persistence)
    const doc = await this.model
      .findByIdAndUpdate(id, persistence, { new: true })
      .lean<TDocument | null>();

    return doc ? this.mapper.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).lean();
    return !!result;
  }
}
