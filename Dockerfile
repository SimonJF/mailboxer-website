# Build stage - compile React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies for build
RUN npm install

# Copy source code
COPY src ./src
COPY public ./public
COPY vite.config.ts ./
COPY tsconfig*.json ./
COPY index.html ./

# Build the application
RUN npm run build

# Production stage - runtime container
FROM node:18-alpine

# Install Docker CLI for container communication
RUN apk add --no-cache docker-cli

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy server files
COPY server ./server

# Expose port
EXPOSE 3001

# Start server
CMD ["node", "server/server.js"]
