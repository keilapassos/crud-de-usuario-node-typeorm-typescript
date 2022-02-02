FROM node:17

WORKDIR /code

COPY package.json yarn.lock /code/

RUN npm install

COPY . /code/

EXPOSE 3000

CMD "npm run dev"
