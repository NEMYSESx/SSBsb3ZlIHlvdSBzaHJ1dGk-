# ChitChat Troubleshooting Guide

## MongoDB Atlas Connection Issues

If you're seeing issues with MongoDB Atlas connection after deployment, as shown in the first screenshot, follow these steps:

### 1. Verify MongoDB Atlas Configuration

- **Check Network Access**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) during testing
- **Verify User Credentials**: Confirm the username and password in your connection string are correct
- **Database Name**: Make sure the database name is correctly specified in the connection string

### 2. Check Environment Variables

- **MONGO_URI**: Verify the MongoDB connection string is correctly set in both:
  - `server/config/config.env`
  - Vercel environment variables

### 3. Test Connection Locally

Run this command to test your MongoDB connection:

```bash
node -e "const mongoose = require('mongoose'); mongoose.connect('your-connection-string').then(() => console.log('Connected')).catch(err => console.error(err))"
```

## Vercel Deployment Issues

If you're experiencing issues with the Vercel deployment as shown in the second screenshot, try these solutions:

### 1. Check Vercel Configuration

- **vercel.json**: Ensure your `vercel.json` file is correctly configured with:
  - Proper build settings
  - Correct routes for API and Socket.IO
  - Filesystem handling for static assets

### 2. Environment Variables

- **Set Required Variables**: Make sure all required environment variables are set in Vercel
- **FRONTEND_URL**: Update to match your actual Vercel deployment URL

### 3. Build Configuration

- **Build Command**: Verify the build command in Vercel is correct
- **Output Directory**: Ensure the output directory is set to `client/dist`

### 4. Socket.IO Configuration

- **Client Configuration**: Update the Socket.IO client configuration to use the correct URL in production
- **CORS Settings**: Ensure CORS settings allow connections from your Vercel domain

### 5. Cookie and Authentication Issues

- **Cookie Settings**: For cross-domain cookies in production, ensure:
  - `sameSite` is set to `"none"`
  - `secure` is set to `true`
  - `path` is set to `"/"`

### 6. Debugging Steps

1. **Check Vercel Logs**: Review deployment and function logs in Vercel
2. **Browser Console**: Check for errors in the browser console
3. **Network Tab**: Examine API requests and responses in the browser's Network tab
4. **Add Debug Logs**: Add console logs to track the flow of your application

## Specific Issues from Screenshots

### MongoDB Atlas Screenshot

The first screenshot shows the MongoDB Atlas dashboard with a collection named `sample_mflix.users`. This suggests:

1. Your application might be connecting to a sample database instead of your actual application database
2. The connection is working, but you may need to create your application's collections

### Vercel Deployment Screenshot

The second screenshot shows a Vercel deployment with:

1. A successful deployment (status: "Ready")
2. Multiple domains including:
   - `chit-chat-tau-five.vercel.app`
   - `chit-chat-git-main-utsavs-projects-3602cc7e.vercel.app`
   - `chit-chat-fc0d664y0b-utsavs-projects-3602cc7e.vercel.app`

This suggests the deployment itself is successful, but there might be issues with:

1. Environment variables not being correctly set
2. API routes not being correctly configured
3. Socket.IO connection issues
4. Cross-domain cookie problems

## Next Steps

1. Update your `FRONTEND_URL` in both `server/config/config.env` and Vercel environment variables to match your actual Vercel URL (`https://chit-chat-tau-five.vercel.app`)
2. Check the browser console for specific error messages
3. Verify your MongoDB Atlas connection is pointing to the correct database
4. Test API endpoints using a tool like Postman
5. Add debug logging to track the authentication flow