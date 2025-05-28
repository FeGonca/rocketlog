import { Router } from 'express';
import { verifyUserAuthorization } from '@/middlewares/verifyUserAuthorization';
import { DeliveriesController } from '@/controllers/deliveries-controller';
import { ensureAuthenticated } from '@/middlewares/ensure-authenticated';

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(['sale']));
deliveriesRoutes.post('/', deliveriesController.create);
deliveriesRoutes.get('/', deliveriesController.index);

export { deliveriesRoutes };
