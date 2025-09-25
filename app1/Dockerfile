ARG BUILD_VAR="buildVar"
FROM node:20.18.0-alpine3.21
LABEL authors="vitalii-codefresh-fnm"
WORKDIR app/
COPY . .
EXPOSE 8002
VOLUME /myvol
RUN yarn install && npm -g uninstall npm

ENTRYPOINT ["node", "index.js"]
