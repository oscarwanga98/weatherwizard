# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy configuration files first for better layer caching
COPY package*.json ./
COPY drizzle.config.ts ./
COPY tsconfig.json ./
COPY vite.config.ts ./

# Install all dependencies (including devDependencies)
RUN npm ci --include=dev

# Copy source files (excluding what's in .dockerignore)
# Note: .env should NOT be in your repository for security reasons
COPY . .

# Create empty public directory if it doesn't exist
RUN mkdir -p public

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy production package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Create a placeholder .env file (safer than copying from builder)
# This ensures the container will run even if .env is missing
RUN touch .env

# Ensure proper permissions
RUN chown -R node:node /app

# Switch to non-root user for security
USER node

# Health check (adjust endpoint as needed)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
