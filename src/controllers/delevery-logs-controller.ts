import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { z } from 'zod';

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const boduSchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string(),
    });

    const { delivery_id, description } = boduSchema.parse(request.body);
    const delevery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
    });

    if (!delevery) {
      throw new AppError('Delivery not found', 404);
    }

    if (delevery.status === 'progressing') {
      throw new AppError('Change status to shipped', 404);
    }

    await prisma.deliveryLogs.create({
      data: {
        deliveryId: delivery_id,
        description: description,
      },
    });
    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const paramsSchema = z.object({
      delivery_id: z.string().uuid(),
    });

    const { delivery_id } = paramsSchema.parse(request.params);

    const delevery = await prisma.delivery.findUnique({
      where: { id: delivery_id },
      include: {
        user: true,
        logs: true,
      },
    });

    if (
      request.user?.role === 'customer' &&
      request.user.id !== delevery?.userId
    ) {
      throw new AppError('The user con only view their deliveries', 401);
    }

    return response.json(delevery);
  }
}

export { DeliveryLogsController };
