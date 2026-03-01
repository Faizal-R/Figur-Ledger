export interface IReportService {
  getGeneratedStatement(accountId: string, statementData: any): Promise<any>;
  getReportById(id: string): Promise<any>;
  getAllReports(): Promise<any[]>;
}
