import { Router } from 'express';
import { usersRoutes } from '@/routes/users-routes';
import { sessionsRoutes } from '@/routes/sessions-routes';
import { deliveriesRoutes } from './deliveries-routes';
import { deliveriesLogsRoutes } from './deliveries-logs-routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/deliveries', deliveriesRoutes);
routes.use('/delivery-logs', deliveriesLogsRoutes);

export { routes };
