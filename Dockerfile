FROM node:alpine

ENV TOKEN null
ENV TOKEN null
ENV CLIENTID null
ENV GUILDID null
ENV ADMINUSERID null

#Dev test
RUN apk add curl

WORKDIR /home
COPY ./ ./

RUN chmod +x ./deploy.sh
CMD ./deploy.sh