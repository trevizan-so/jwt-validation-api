FROM node:18

WORKDIR /app

COPY ./package.json ./

COPY . .

EXPOSE 80 

CMD ["node dist/main"]
