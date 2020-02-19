FROM node:10

WORKDIR /var/www-api

ADD . /var/www-api

RUN npm install

EXPOSE 1234

ENTRYPOINT [ "node" ]
CMD ["index.js"]