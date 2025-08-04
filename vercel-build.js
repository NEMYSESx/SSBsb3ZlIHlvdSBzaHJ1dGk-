// This script is used by Vercel to build the project

import { execSync } from 'child_process';
import fs from 'fs';

console.log('Starting Vercel build process...');

// Check if we're in a Vercel environment
const isVercel = process.env.VERCEL === '1';

if (isVercel) {
  console.log('Running in Vercel environment');
  
  // Ensure MongoDB URI is set
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI environment variable is not set!');
    process.exit(1);
  }
  
  // Ensure NODE_ENV is set to production
  if (process.env.NODE_ENV !== 'production') {
    console.log('Setting NODE_ENV to production');
    process.env.NODE_ENV = 'production';
  }
  
  // Log the Vercel URL for debugging
  console.log('Vercel URL:', process.env.VERCEL_URL);
  
  // Set FRONTEND_URL if not already set
  if (!process.env.FRONTEND_URL && process.env.VERCEL_URL) {
    console.log(`Setting FRONTEND_URL to https://${process.env.VERCEL_URL}`);
    process.env.FRONTEND_URL = `https://${process.env.VERCEL_URL}`;
  }
}

// Build the client
console.log('Building client...');
try {
  execSync('cd client && npm install && npm run build', { stdio: 'inherit' });
  console.log('Client build completed successfully');
} catch (error) {
  console.error('Client build failed:', error);
  process.exit(1);
}

console.log('Vercel build process completed successfully');