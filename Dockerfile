
FROM node:20-alpine

# Install ffmpeg on Alpine
RUN apk update && \
    apk add --no-cache ffmpeg

WORKDIR /steve-ai-bot

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "node" , "." ]