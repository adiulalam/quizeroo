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

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/src/env.js ./src/env.js

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json /app/package-lock.json ./

COPY --from=builder /app/entrypoint.sh ./
RUN dos2unix ./entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start"]
