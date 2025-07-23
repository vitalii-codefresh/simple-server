ARG BUILD_VAR="buildVar"
FROM node:20.18.0-alpine3.20
LABEL authors="vitalii-codefresh"
WORKDIR app/
COPY . .
EXPOSE 8002
VOLUME /myvol
RUN yarn install && npm -g uninstall npm

ENTRYPOINT ["node", "index.js"]
