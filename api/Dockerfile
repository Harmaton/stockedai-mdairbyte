# Use debian-based Node.js image instead of alpine
FROM node:20

# Install pnpm globally
RUN npm install -g pnpm

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install app dependencies
RUN pnpm install --frozen-lockfile --prod=false

# Bundle app source
COPY . .

# Copy the .env files
COPY .env* ./

# Build the application
RUN pnpm run build

# Expose the port
EXPOSE 3001

# Start the server
CMD ["pnpm", "run", "start:prod"]