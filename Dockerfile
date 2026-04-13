FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=builder /app/build /srv/falstar-store
COPY Caddyfile /etc/caddy/Caddyfile
EXPOSE 8080
