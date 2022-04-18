FROM node:alpine
ADD . /api/

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Copy everything else
COPY . /usr/src/app

# Expose the web service port
EXPOSE 8000

CMD node . $ADDRESS 8000
