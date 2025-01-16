FROM node:18

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json pnpm-lock.yaml .npmrc* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Set environment variables
ARG BACKEND_URL
ENV BACKEND_URL=${BACKEND_URL}

CMD ["pnpm", "start"]
