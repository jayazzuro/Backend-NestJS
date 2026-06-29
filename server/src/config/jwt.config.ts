import { registerAs } from '@nestjs/config';

const VALID_EXPIRES_IN_PATTERN = /^\d+[smhd]$/;
const DEFAULT_EXPIRES_IN = '1d';

export default registerAs('jwt', () => {
  const expiresIn = process.env.JWT_EXPIRES_IN ?? DEFAULT_EXPIRES_IN;

  if (!VALID_EXPIRES_IN_PATTERN.test(expiresIn)) {
    throw new Error(
      `Invalid JWT_EXPIRES_IN value: "${expiresIn}". Must be a number followed by s, m, h, or d (e.g., "3600s", "60m", "1h", "7d").`,
    );
  }

  return { expiresIn };
});
