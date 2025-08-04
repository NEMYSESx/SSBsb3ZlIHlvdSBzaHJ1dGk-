#!/bin/bash

# This script helps with the build process for Vercel deployment

echo "Starting build process..."

# Install dependencies for the root project
npm install

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
cd ..

# Install and build client
echo "Installing client dependencies and building..."
cd client
npm install
npm run build
cd ..

echo "Build process completed successfully!"