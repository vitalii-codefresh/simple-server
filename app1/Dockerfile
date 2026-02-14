ARG BUILD_VAR="buildVar"
FROM dhi.io/node:24-debian13-sfw-dev
LABEL authors="vitalii-codefresh"
WORKDIR app/
COPY --chown=node:node package.json ./
RUN mkdir -p data && chown -R node:node /app
VOLUME ["/app/data"]
USER node
RUN yarn install --frozen-lockfile --production
EXPOSE 8002
ENTRYPOINT ["node", "index.js"]
