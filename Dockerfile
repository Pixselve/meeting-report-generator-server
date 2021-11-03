FROM node:16-slim AS development
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:16-slim as production
RUN apt-get update
RUN apt-get install -y openssl
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npx prisma generate
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
