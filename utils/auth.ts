import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/User'; // Adjust path as needed

// Environment variables with fallbacks
const secret = process.env.JWT_SECRET || 'defaultsecret';
const expiration = process.env.TOKEN_EXPIRY || '2h';

// Define the payload structure stored in JWT
interface JWTPayload extends JwtPayload {
  _id: string;
  email: string;
}

// Extend Express Request type to include authenticated user
export interface AuthRequest extends Request {
  user?: JWTPayload;
}

// ✅ Express middleware (for REST routes, if used)
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, secret) as JWTPayload;
      req.user = decoded;
    } catch (err: any) {
      console.warn('Invalid token:', err.message);
    }
  }

  next();
};

// ✅ Apollo context middleware (used in server.ts)
export const getContext = ({ req }: { req: Request }) => {
  const authHeader = req.headers.authorization;
  let user: JWTPayload | null = null;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, secret) as JWTPayload;
      user = decoded;
    } catch (err: any) {
      console.warn('Invalid token in Apollo context:', err.message);
    }
  }

  return { user }; // Apollo expects a context object
};

// ✅ Helper to generate JWT token
export const signToken = (user: Pick<IUser, '_id' | 'email'>): string => {
  const payload: JWTPayload = {
    _id: user._id.toString(),
    email: user.email,
  };

  return jwt.sign(payload, secret, { expiresIn: expiration });
};

// Export Express middleware by default (optional for REST setups)
export default authMiddleware;



