ARG BUILD_VAR="buildVar"
FROM node:20.11-alpine3.18
LABEL authors="vitalii-codefresh"
WORKDIR app/
COPY . .
EXPOSE 8010
VOLUME /myvol
RUN ["npm", "i"]

ENTRYPOINT ["node", "index2.js"]
