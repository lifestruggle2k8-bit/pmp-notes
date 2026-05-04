import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Extended Express Request with authenticated user context
 */
export interface AuthRequest extends Request {
  userId?: string;
}

/**
 * Generate JWT token for a user
 * @param userId - The user ID to encode in the token
 * @returns JWT token string
 */
export function generateToken(userId: string): string {
  const secret = process.env.JWT_SECRET || 'default-secret-change-this-in-production';
  const token = jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    secret,
    { expiresIn: '7d' }
  );
  return token;
}

/**
 * Verify JWT token and extract userId
 * @param token - JWT token string
 * @returns Decoded token with userId, or null if invalid
 */
export function verifyToken(token: string): { userId: string; iat: number } | null {
  try {
    const secret = process.env.JWT_SECRET || 'default-secret-change-this-in-production';
    const decoded = jwt.verify(token, secret);
    return decoded as { userId: string; iat: number };
  } catch (error) {
    return null;
  }
}

/**
 * Authentication middleware for Express
 * Extracts and validates JWT token from Authorization header
 * Attaches userId to request if token is valid
 */
export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  // Extract bearer token from "Bearer <token>"
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ error: 'Invalid authorization header format. Expected: Bearer <token>' });
    return;
  }

  const token = parts[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return;
  }

  // Attach userId to request
  req.userId = decoded.userId;
  next();
}

export default authMiddleware;
