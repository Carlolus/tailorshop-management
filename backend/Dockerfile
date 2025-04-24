# Description: Dockerfile for TailorShop application
# This Dockerfile sets up a Node.js environment for the application.
# It uses the official Node.js image, installs dependencies, and runs the application.
FROM node:18-alpine
# Set the working directory in the container to /app
# This is where the application code will be copied and run
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
# This allows Docker to cache the npm install step, speeding up builds
# if the dependencies haven't changed
COPY package*.json ./
# Install the application dependencies
RUN npm install
# Copy the rest of the application code to the working directory
# This includes all the source files, configuration files, etc.
COPY . .
# Build the application
# This step compiles the TypeScript code into JavaScript
EXPOSE 3000
# Run the application in development mode
CMD ["npm", "run", "dev"]