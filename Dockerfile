FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

CMD ["sh", "-c", "npm install && npm run dev -- --hostname 0.0.0.0"]
