# ---- Build stage ----
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# For staging/prod we build for site root "/"
RUN npm run build

# ---- Runtime stage ----
FROM nginx:alpine

# Minimal nginx site config will be added next as nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Serve the React build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx","-g","daemon off;"]
