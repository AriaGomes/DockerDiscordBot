FROM node:alpine

#Dev test
RUN apk add curl

WORKDIR /home
COPY ./ ./

RUN yarn

RUN chmod +x ./deploy.sh
CMD ./deploy.sh