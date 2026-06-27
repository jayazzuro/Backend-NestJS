function resolveJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  return secret;
}

export const jwtConstants = {
  get secret(): string {
    return resolveJwtSecret();
  },
};
