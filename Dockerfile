FROM node:18

WORKDIR /app

COPY ./package.json ./

COPY . .

RUN npm install

EXPOSE 80 

ENTRYPOINT ["npm","run","start:prod"]
