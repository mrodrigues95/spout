FROM node:16 as dev

ENV PORT 3000
ENV TAILWIND_MODE watch

WORKDIR /srv/frontend

COPY package.json ./
COPY yarn.lock ./
RUN yarn

EXPOSE ${PORT}
CMD [ "yarn", "dev" ]