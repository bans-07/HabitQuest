// Custom middleware for logging requests (optional)
import dotenv from 'dotenv';
dotenv.config();

import { Request, Response, NextFunction } from 'express';

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string | undefined;

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
  }

  next();
};
