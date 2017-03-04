FROM node:alpine

EXPOSE 5000

RUN mkdir -p /shuttle/jobs
WORKDIR /shuttle

# Install NPM packages
COPY package.json /shuttle/
RUN npm install

# Copy code to /shuttle
COPY . /shuttle
CMD ["npm", "start"]