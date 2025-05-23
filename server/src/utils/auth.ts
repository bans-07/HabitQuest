import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { IUser } from '../models/User'; 

const secret = process.env.JWT_SECRET || 'supersecretkey';
const expiration = '2h';

// Sign token with user info
export const signToken = ({ _id, username, firstName, lastName }: IUser) => {
    const payload = { _id, username, firstName, lastName };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  };


// Middleware for GraphQL context
export const authMiddleware = ({ req }: { req: Request }) => {
  // token can be in req.body, req.query, or headers
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop()?.trim(); // Bearer <token>
  }

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret) as { data: IUser };
    req.user = data;
  } catch {
    console.warn('Invalid token');
  }

  return req;
};

export class AuthenticationError extends Error {
  constructor(message = 'You must be logged in.') {
    super(message);
    this.name = 'AuthenticationError';
  }
}
