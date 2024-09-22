# Stage 1: Install dependencies
FROM node:18-alpine AS deps

RUN apk --no-cache add bash dos2unix libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build application
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
COPY deploy-server.sh .
RUN chmod +x deploy-server.sh

# Stage 3: Production image
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/deploy-server.sh .

RUN dos2unix ./deploy-server.sh

CMD ["bash", "-c", "source ./deploy-server.sh"]
