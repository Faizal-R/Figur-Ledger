export interface IAnalyticsService {
  getTrafficAnalytics(period: string): Promise<any>;
  getUserActivityAnalytics(userId: string): Promise<any>;
  getPerformanceMetrics(): Promise<any>;
}
