// Custom middleware for logging requests (optional)
import dotenv from 'dotenv';
dotenv.config();

export const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid or missing API key' });
  }

  next();
};
