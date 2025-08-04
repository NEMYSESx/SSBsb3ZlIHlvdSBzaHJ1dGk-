# ChitChat - Real-time Chat Application

## Deployment Guide for Vercel

This guide provides instructions for deploying the ChitChat application to Vercel and troubleshooting common issues.

### Prerequisites

- Node.js and npm installed
- Vercel CLI installed (`npm install -g vercel`)
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Deployment Steps

#### 1. MongoDB Atlas Setup

- Ensure your MongoDB Atlas cluster is properly configured
- Make sure your IP address is whitelisted in Atlas (or set to allow access from anywhere for testing)
- Verify the connection string in `server/config/config.env` is correct

#### 2. Environment Variables

Ensure the following environment variables are set in both your local `.env` files and in Vercel:

```
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/?retryWrites=true&w=majority
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app-url.vercel.app
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
JWT_SECRET_KEY=your-jwt-secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
```

#### 3. Vercel Deployment

1. Login to Vercel CLI:
   ```
   vercel login
   ```

2. Deploy the application:
   ```
   vercel
   ```

3. For production deployment:
   ```
   vercel --prod
   ```

### Troubleshooting Common Issues

#### MongoDB Connection Issues

1. **Connection String**: Ensure your MongoDB Atlas connection string is correct in both `server/config/config.env` and Vercel environment variables.

2. **Network Access**: Make sure your MongoDB Atlas cluster allows connections from Vercel's IP addresses or from anywhere (for testing).

3. **Database Name**: The database name should be included in the connection string for MongoDB Atlas.

#### Cookie and Authentication Issues

1. **Cookie Settings**: For cross-domain cookies in production, ensure:
   - `sameSite` is set to `"none"`
   - `secure` is set to `true`
   - `path` is set to `"/"`

2. **JWT Token**: Verify the JWT token is being properly generated and stored in cookies.

#### Socket.IO Connection Issues

1. **Socket URL**: Ensure the Socket.IO client is connecting to the correct URL in production.

2. **CORS Settings**: Verify CORS settings in `server/app.js` and `server/utils/socket.js` allow connections from your Vercel domain.

3. **Path Configuration**: Make sure the Socket.IO path is correctly set to `/socket.io` on both client and server.

#### Vercel-specific Issues

1. **Build Configuration**: Check `vercel.json` for correct build and route configurations.

2. **Environment Variables**: Ensure all required environment variables are set in Vercel.

3. **Logs**: Check Vercel deployment logs for any errors during build or runtime.

### Debugging Tips

1. Add console logs to track the flow of your application.

2. Use the browser's developer tools to check for network errors or CORS issues.

3. Verify that cookies are being properly set and sent with requests.

4. Check that the Socket.IO connection is established successfully.

5. Ensure API requests are being made to the correct endpoints.

### Need Help?

If you're still experiencing issues, please:

1. Check the Vercel deployment logs
2. Review the MongoDB Atlas logs
3. Examine the browser console for client-side errors