# Use official Node.js image
FROM node:18-alpine

# Install system dependencies required for node-gyp
RUN apk add --no-cache python3 py3-pip make g++ 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "run", "start"]
