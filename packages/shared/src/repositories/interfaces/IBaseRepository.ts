// src/core/interfaces/IBaseRepository.ts
export interface IBaseRepository<TDomain> {
  create(data: Partial<TDomain>): Promise<TDomain>;
  findById(id: string): Promise<TDomain | null>;
  findOne(query: Record<string, unknown>): Promise<TDomain | null>;
  find(
    query?: Record<string, unknown>,
    projection?: Record<string, unknown>,
    options?: { limit?: number; sort?: Record<string, 1 | -1> }
  ): Promise<TDomain[]>;
  update(id: string, data: Partial<TDomain>): Promise<TDomain | null>;
  delete(id: string): Promise<boolean>;
}
