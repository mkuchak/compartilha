FROM node:16
WORKDIR /home/app
COPY package.json .

RUN npm install

COPY . ./
CMD ["npm", "run", "dev"]