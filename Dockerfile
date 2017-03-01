FROM node:alpine
EXPOSE 5000

RUN mkdir -p /code
WORKDIR /code

COPY package.json /code/
RUN npm install

COPY . /code
CMD ["npm", "start"]