FROM node:20-bookworm

RUN corepack enable

VOLUME [ "/.pnpm-store" ]
RUN pnpm config --global set store-dir /.pnpm-store
