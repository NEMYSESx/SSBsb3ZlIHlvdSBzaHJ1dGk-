# ChitChat - Real-time Chat Application

## Deployment Guide for Vercel

This guide will help you deploy the ChitChat application on Vercel and migrate from a local MongoDB database to MongoDB Atlas.

### Prerequisites

1. A [Vercel](https://vercel.com/) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
3. A [Cloudinary](https://cloudinary.com/) account (already set up in your project)

### Step 1: Set up MongoDB Atlas

1. Create a MongoDB Atlas account or log in to your existing account
2. Create a new cluster (the free tier is sufficient for starting)
3. Set up a database user with a secure password
4. Configure network access (IP whitelist) - you can allow access from anywhere (0.0.0.0/0) for simplicity
5. Get your connection string from Atlas, it will look like:
   ```
   mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
   ```
6. Replace `<username>`, `<password>`, `<cluster-url>`, and `<database-name>` with your actual values

### Step 2: Update Environment Variables

The `config.env` file has been updated with placeholders. Before deployment, replace these placeholders with your actual values:

1. Update the `MONGO_URI` with your MongoDB Atlas connection string
2. Set `FRONTEND_URL` to your Vercel deployment URL (you'll get this after your first deployment)

### Step 3: Deploy to Vercel

1. Push your code to a GitHub repository
2. Log in to Vercel and create a new project
3. Import your GitHub repository
4. Configure the project:
   - Set the root directory to `/`
   - Set the build command to `cd client && npm install && npm run build`
   - Set the output directory to `client/dist`
5. Add the following environment variables in Vercel's project settings:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 4000
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret
   - `JWT_SECRET_KEY`: Your JWT secret key
   - `JWT_EXPIRE`: 7d
   - `COOKIE_EXPIRE`: 7
   - `NODE_ENV`: production
   - `FRONTEND_URL`: Your Vercel deployment URL (update after first deployment)
6. Deploy the project

### Step 4: Update Frontend URL

After your first deployment, you'll get a Vercel URL. Update the `FRONTEND_URL` environment variable in Vercel with this URL.

### Step 5: Verify Deployment

1. Visit your Vercel deployment URL
2. Test user registration and login
3. Test sending messages and real-time communication

## Project Structure

- `client/`: React frontend built with Vite
- `server/`: Express.js backend
  - `config/`: Environment configuration
  - `controllers/`: API route handlers
  - `database/`: Database connection
  - `middlewares/`: Express middlewares
  - `models/`: Mongoose models
  - `routes/`: API routes
  - `utils/`: Utility functions

## Key Changes for Deployment

1. Added `vercel.json` configuration file
2. Updated MongoDB connection to use MongoDB Atlas
3. Modified cookie settings for cross-domain usage
4. Updated client-side API and socket connection configurations

## Troubleshooting

- **Cookie Issues**: If authentication doesn't work, check that your cookie settings are correct for cross-domain usage
- **Socket Connection**: If real-time features don't work, verify the socket connection settings
- **Database Connection**: Check MongoDB Atlas connection string and network access settings
- **CORS Issues**: Ensure the `FRONTEND_URL` is correctly set in your environment variables