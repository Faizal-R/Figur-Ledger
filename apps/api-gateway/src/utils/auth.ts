/* EXPRESS */
import { Application } from 'express';
/* APP */
import { IRoute } from '../types';

export const useAuth = ( app: Application, routes: IRoute[]  ) => {

  routes.forEach( route => {
    app.use(route.url, /* Auth Check Function */)
  })
}