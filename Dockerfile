FROM node:alpine
RUN apk update && apk upgrade

WORKDIR /home/node
ENTRYPOINT yarn start
HEALTHCHECK CMD wget localhost:3000/ -q -O -
EXPOSE 3000
ENV NODE_ENV=production

# Install packages
ADD package.json yarn.lock ./
RUN yarn --frozen-lockfile --prod

# Copy source
ADD index.js .
