FROM node:14-alpine

# Set necessary environment variables.
ENV NODE_ENV=production


# Set the default working directory for the app
# It is a best practice to use the /usr/src/app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm set strict-ssl false

RUN npm install --only=production

RUN npm install -g @nestjs/cli


COPY . .

RUN npm run build


# Expose API port
EXPOSE 3000

CMD [ "ls" ]

# Run the web service on container startup
CMD [ "npm", "start:prod" ]
