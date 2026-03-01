
export interface IMapper<TDomain, TDocument> {
  toDomain(document: TDocument): TDomain;
  toPersistence(domain: Partial<TDomain>): Partial<TDocument>;
}
