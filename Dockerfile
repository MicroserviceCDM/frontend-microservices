FROM node:23-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD npm run dev -- --host

# # Stage 2: Serve the application with Caddy
# FROM caddy:2.9-alpine

# COPY --from=build /app/dist /usr/share/caddy
# COPY Caddyfile /etc/caddy/Caddyfile

# EXPOSE 5173