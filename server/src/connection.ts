// MongoDB connection configuration goes here
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Explicitly load the .env file from the server directory
dotenv.config({ path: __dirname + '/../.env' });

const MONGODB_URI = process.env.MONGODB_URI || '';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', () => {
  console.log('✅ MongoDB connected');
});

export default db;