FROM node:22-alpine

WORKDIR /app

# Ensure correct permission for cache
RUN mkdir -p /app/.next/cache && chown -R node:node /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# Expose Next.js port
EXPOSE 3000

# Set user to node to avoid root permission issues on host volumes
USER node

# We run the dev server binding to all interfaces
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
