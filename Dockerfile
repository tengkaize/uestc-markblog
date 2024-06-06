FROM node:20-bookworm-slim AS base
RUN apt-get -y update && apt-get -y install openssl

FROM base AS build
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm config --global set store-dir /.pnpm-store

FROM build AS build-sql
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN --mount=type=cache,target=/.pnpm-store,sharing=locked \
    pnpm dlx \
    prisma migrate diff \
        --from-empty \
        --to-schema-datamodel ./prisma/schema.prisma \
        --script \
        --output ./prisma/init.sql

FROM build AS build-app
COPY . .
RUN --mount=type=cache,target=/.pnpm-store,sharing=locked pnpm install --frozen-lockfile
RUN pnpm exec prisma generate
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

FROM base AS app
WORKDIR /app
COPY --from=build-app /app/.next/standalone .
COPY --from=build-app /app/.next/static ./.next/static
COPY --from=build-app /app/public ./public
EXPOSE 3000
CMD [ "node", "./server.js" ]

FROM postgres:16-bookworm AS db
COPY --from=build-sql /app/prisma/init.sql /docker-entrypoint-initdb.d/init.sql
