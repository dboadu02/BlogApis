import crypto from 'crypto'

export const passwordResetToken = () => {
  return {
    resetToken: crypto.randomBytes(32).toString("hex"),
    expiresAt: new Date(Date.now() + 3 * 60 * 1000),
  };
};