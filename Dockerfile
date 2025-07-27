# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci --include=dev

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy package files again
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
