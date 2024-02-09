ARG BUILD_VAR="buildVar"
FROM node:20.11-alpine3.18
LABEL authors="vitalii-codefresh"
WORKDIR app/
COPY . .
EXPOSE 8001
VOLUME /myvol
RUN ["npm", "i"]

CMD ["echo", "$BUILD_VAR", "<", " - BUILD_VAR"]
CMD ["echo", "$LOCAL_VAR", "<", " - LOCAL_VAR"]
ENTRYPOINT ["node", "index.js"]
