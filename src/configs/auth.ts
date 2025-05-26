export const authConfig = {
  jwt: {
    secret: process.env.JWT_SERCRET,
    expiresIn: '1h',
  },
};
