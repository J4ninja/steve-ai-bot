
FROM node:20

RUN apt-get update && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /steve-ai-bot

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "node" , "." ]