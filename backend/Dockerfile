# Build from repository root:
#   docker build -f backend/Dockerfile .
#
FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/src ./src
COPY shared/catalog.json ./shared/catalog.json

EXPOSE 5000

CMD ["npm", "start"]
