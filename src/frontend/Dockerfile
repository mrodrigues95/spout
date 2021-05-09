FROM node:14

ENV PORT 3000
WORKDIR /srv/frontend

COPY package.json /srv/frontend/
COPY yarn.lock /srv/frontend/
RUN yarn install

COPY . .

EXPOSE ${PORT}
CMD [ "yarn", "dev" ]