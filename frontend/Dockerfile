# Build from repository root:
#   docker build -f frontend/Dockerfile .
#
FROM node:20-alpine AS build

WORKDIR /build

COPY shared /build/shared

COPY frontend/package*.json /build/frontend/
WORKDIR /build/frontend

RUN npm ci

COPY frontend .

ARG VITE_BACKEND_URL=
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:1.27-alpine

ARG NGINX_CONF=nginx.conf

COPY frontend/${NGINX_CONF} /etc/nginx/conf.d/default.conf
COPY --from=build /build/frontend/dist /usr/share/nginx/html

EXPOSE 80
