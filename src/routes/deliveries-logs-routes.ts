import { Router } from 'express';
import { DeliveryLogsController } from '@/controllers/delevery-logs-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';

const deliveriesLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveriesLogsRoutes.post(
  '/',
  ensureAuthenticated,
  verifyUserAuthorization(['sale']),
  deliveryLogsController.create
);

export { deliveriesLogsRoutes };
