FROM node:20-alpine

WORKDIR /app

COPY . .

RUN cd backend && npm install && npm run build

EXPOSE 3000

CMD ["sh", "-c", "cd backend && npm start"]
