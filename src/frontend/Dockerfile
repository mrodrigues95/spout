FROM node:16

ENV PORT 3000
ENV NODE_ENV development
ENV TAILWIND_MODE watch

WORKDIR /srv/frontend

COPY package.json /srv/frontend/
COPY yarn.lock /srv/frontend/
RUN yarn install

COPY . .

EXPOSE ${PORT}
CMD [ "yarn", "dev" ]