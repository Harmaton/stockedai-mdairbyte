# Use the official Node.js image as a base image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json, pnpm-lock.yaml, and .npmrc if present
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables (use Docker's build-time ARGs and runtime ENV for flexibility)
ARG MOTHERDUCK_API_TOKEN
ARG AIRBYTE_CLIENT_ID
ARG AIRBYTE_SECRET_ACCESS
ARG COIN_ENVIRONMENT

ENV MOTHERDUCK_API_TOKEN=${MOTHERDUCK_API_TOKEN}
ENV AIRBYTE_CLIENT_ID=${AIRBYTE_CLIENT_ID}
ENV AIRBYTE_SECRET_ACCESS=${AIRBYTE_SECRET_ACCESS}
ENV COIN_ENVIRONMENT=${COIN_ENVIRONMENT}

# Build the NestJS application
RUN pnpm run build

# Start the application
CMD ["pnpm", "start:prod"]
