FROM node:24-alpine AS builder

# # Install build dependencies (example: gcc, make)
# RUN apk add --no-cache build-base

# Set working directory
WORKDIR /app

# Copy source code
COPY package*.json .

# Build your application (uncomment and modify as needed)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (uncomment and modify as needed)
RUN npm run build

# The builder stage is ready for multi-stage builds
FROM alpine:3.22.1
# Install runtime dependencies
RUN apk add --no-cache nodejs
# Set working directory
WORKDIR /app
# Copy built application from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

# Expose the port your application runs on (modify as needed)
EXPOSE 3000
# Command to run your application (modify as needed)
CMD ["node", "server.js"]
