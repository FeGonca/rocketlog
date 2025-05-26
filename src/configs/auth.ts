import { env } from '@/env';

export const authConfig = {
  jwt: {
    secret: env.JWT_SERCRET,
    expiresIn: '1h',
  },
};
