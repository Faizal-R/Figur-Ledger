FROM node:20-alpine AS pruner
WORKDIR /app
COPY . .
RUN npx turbo prune api-gateway --docker

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
RUN npm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
COPY tsconfig.json tsconfig.json
RUN npx turbo run build --filter=api-gateway

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules


COPY --from=builder /app/packages/shared/dist         ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json
COPY --from=builder /app/packages/types/dist          ./packages/types/dist
COPY --from=builder /app/packages/types/package.json  ./packages/types/package.json
COPY --from=builder /app/packages/handlers/dist       ./packages/handlers/dist
COPY --from=builder /app/packages/handlers/package.json ./packages/handlers/package.json
COPY --from=builder /app/packages/utils/dist          ./packages/utils/dist
COPY --from=builder /app/packages/utils/package.json   ./packages/utils/package.json



COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/apps/api-gateway/package.json ./package.json
EXPOSE 5001
CMD ["node", "dist/server.js"]