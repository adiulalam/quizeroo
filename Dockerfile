# Stage 1: Install dependencies
FROM node:20-alpine AS deps

RUN apk --update add bash 
RUN apk add --no-cache libc6-compat dos2unix

WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma/ ./prisma/
RUN npm install

# Stage 2: Build application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build
COPY deploy-server.sh .
RUN chmod +x deploy-server.sh

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json /app/tsconfig.server.json ./

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/deploy-server.sh .

RUN dos2unix ./deploy-server.sh

CMD source deploy-server.sh
