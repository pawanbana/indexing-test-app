FROM node:10

WORKDIR /var/www-api

ADD . /var/www-api

ENTRYPOINT [ "node" ]
CMD ["index.js"]