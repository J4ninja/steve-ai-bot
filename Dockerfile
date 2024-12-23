
FROM node:20

WORKDIR /steve-ai-bot

COPY package*.json ./

RUN npm install 

COPY . .

CMD [ "node" , "." ]