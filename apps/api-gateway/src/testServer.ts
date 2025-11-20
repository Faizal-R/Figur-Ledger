// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import { corsOptions } from "./lib/cors";
// import { limiter } from "./lib/rate-limiter";
// import { useApiProxy } from "./utils/proxy";
// import { useAuth } from "./utils/auth";
// import { routes } from "./config/routes";
// import { errorHandler } from "./middlewares/errorHandler";
// import { logger } from "./utils/logger";
// import { routeManager } from "./managers/RouteManager";

// const app: Application = express();

// const initializeMiddlewares = (app: Application): void => {
//   app.use(helmet());
//   app.use(cors(corsOptions));
//   app.use(limiter);
//   app.use(express.json({ limit: '10mb' }));
//   app.use(express.urlencoded({ extended: true }));
//   app.use(morgan("combined", { 
//     stream: { write: (message) => logger.info(message.trim()) } 
//   }));
// };

// const initializeRoutes = (app: Application): void => {
//   // Basic health check - API Gateway itself
//   app.get('/health', (req: Request, res: Response) => {
//     res.status(200).json({ 
//       status: 'OK', 
//       service: 'api-gateway',
//       timestamp: new Date().toISOString(),
//       environment: process.env.NODE_ENV || 'development',
//       version: process.env.npm_package_version || '1.0.0'
//     });
//   });

//   // Comprehensive services health check
//   app.get('/health/services', async (req: Request, res: Response) => {
//     const healthChecks = await Promise.all(
//       routeManager.getAllServices().map(async (service) => {
//         try {
//           const healthUrl = routeManager.getServiceHealthUrl(service);
//           const serviceConfig = routeManager.getServiceConfig(service);
          
//           const controller = new AbortController();
//           const timeoutId = setTimeout(() => controller.abort(), 5000);
          
//           const response = await fetch(healthUrl, { 
//             signal: controller.signal 
//           });
//           clearTimeout(timeoutId);

//           return {
//             service,
//             status: response.status === 200 ? 'healthy' : 'unhealthy',
//             statusCode: response.status,
//             responseTime: 'measured', // You can add response time measurement
//             url: healthUrl
//           };
//         } catch (error: any) {
//           return {
//             service,
//             status: 'unreachable',
//             error: error.name === 'AbortError' ? 'Timeout after 5s' : error.message,
//             url: routeManager.getServiceHealthUrl(service)
//           };
//         }
//       })
//     );

//     const allHealthy = healthChecks.every(check => check.status === 'healthy');
//     const statusCode = allHealthy ? 200 : 503;
    
//     res.status(statusCode).json({ 
//       status: allHealthy ? 'healthy' : 'degraded',
//       timestamp: new Date().toISOString(),
//       services: healthChecks,
//       summary: {
//         total: healthChecks.length,
//         healthy: healthChecks.filter(s => s.status === 'healthy').length,
//         unhealthy: healthChecks.filter(s => s.status === 'unhealthy').length,
//         unreachable: healthChecks.filter(s => s.status === 'unreachable').length
//       }
//     });
//   });

//   // Apply authentication middleware
//   useAuth(app, routes);
  
//   // Apply API proxy
//   useApiProxy(app, routes);

//   // 404 handler
//   app.use('*', (req: Request, res: Response) => {
//     logger.warn(`Route not found: ${req.originalUrl}`);
//     res.status(404).json({ 
//       error: 'Route not found',
//       path: req.originalUrl,
//       timestamp: new Date().toISOString()
//     });
//   });

//   // Global error handler
//   app.use(errorHandler);
// };

// const startServer = (app: Application): void => {
//   const port = process.env.PORT || 3000;
  
//   // Validate service registry on startup
//   const validation = routeManager.validateServiceRegistry();
//   if (!validation.valid) {
//     logger.error('Service registry validation failed:', validation.errors);
//     process.exit(1);
//   }

//   app.listen(port, () => {
//     logger.info(`🚀 API Gateway running on port ${port}`);
//     logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//     logger.info(`🩺 Health check: http://localhost:${port}/health`);
//     logger.info(`🏥 Services health: http://localhost:${port}/health/services`);
//     logger.info(`🔧 Registered services: ${routeManager.getAllServices().join(', ')}`);
//   });
// };

// export const server = (): Application => {
//   initializeMiddlewares(app);
//   initializeRoutes(app);
//   return app;
// };

// if (require.main === module) {
//   const app = server();
//   startServer(app);
// }

// export default app;