FROM node:20-alpine AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune notification-service --docker

FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm install
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
COPY tsconfig.json tsconfig.json

RUN npx turbo run build --filter=notification-service

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules



COPY --from=builder /app/packages/messaging-sdk/dist         ./packages/messaging-sdk/dist
COPY --from=builder /app/packages/messaging-sdk/package.json ./packages/messaging-sdk/package.json

COPY --from=builder /app/services/notification-service/dist ./dist
COPY --from=builder /app/services/notification-service/package.json ./package.json
EXPOSE 5002
CMD ["node", "dist/server.js"]