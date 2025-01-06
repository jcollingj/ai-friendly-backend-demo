FROM oven/bun:1

# Set environment variables
ENV DIRECT_URL=${DIRECT_URL}

# Copy package files
COPY package.json .
COPY bun.lockb .

# Copy source code and prisma schema
COPY src/ src/
COPY prisma/ prisma/

# Install dependencies
RUN bun install

# Generate Prisma client and run migrations
RUN bunx prisma db pull
RUN bunx prisma generate

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["bun", "src/server.ts"]
