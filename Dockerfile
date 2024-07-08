FROM node:14
# Instalar versión especifica de npm
RUN npm install -g npm@8
WORKDIR /app/src
COPY *.json *.js ./
RUN npm install
ENTRYPOINT ["npm", "run"]
CMD [ "start", "--", "--host", "0.0.0.0" ]
