
FROM node:20

RUN apt-get update && \
    apt-get install -y ffmpeg 

WORKDIR /steve-ai-bot

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "node" , "." ]