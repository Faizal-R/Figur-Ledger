import { ServiceName, serviceRegistry } from "../config/serviceRegistry";
import { routes } from "../config/routes";

export class RouteManager {
  public getAllServices(): ServiceName[] {
    return Object.values(ServiceName);
  }

  public getServiceHealthUrl(service: ServiceName): string {
    const config = serviceRegistry[service];
    const healthPath = config.healthCheckPath || '/health';
    return `${config.target}${healthPath}`;
  }

  public getServiceConfig(service: ServiceName) {
    return serviceRegistry[service];
  }

  public validateServiceRegistry(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    Object.entries(serviceRegistry).forEach(([serviceName, config]) => {
      if (!config.target) {
        errors.push(`Service ${serviceName} has no target URL`);
      }
      if (!config.timeout || config.timeout <= 0) {
        errors.push(`Service ${serviceName} has invalid timeout`);
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

export const routeManager = new RouteManager();