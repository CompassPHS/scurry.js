FROM node:alpine

EXPOSE 5000

RUN mkdir -p /shuttle
WORKDIR /shuttle

# Install NPM packages
COPY package.json /shuttle/
RUN npm install

# Copy code
COPY . /code
CMD ["npm", "start"]