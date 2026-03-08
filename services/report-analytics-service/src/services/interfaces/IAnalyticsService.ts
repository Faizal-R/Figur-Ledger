export interface IAnalyticsService {
  getDashboardAnalytics(type?: string): Promise<any>;
}
