export interface IReportService {
  getGeneratedStatement(accountId: string, statementData: any): Promise<any>;
}
