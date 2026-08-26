# Multi-stage Dockerfile for Brew & Bean Café (Full-Stack Express + Vite)

# Step 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Build Vite frontend bundle
RUN npm run build

# Step 2: Production Execution Stage
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm install tsx -g

# Copy compiled frontend assets & backend code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/cafe_store.json ./cafe_store.json

# Expose port 5000
EXPOSE 5000

# Start Express Backend & Serve Cafe Application
CMD ["npx", "tsx", "server/index.ts"]
