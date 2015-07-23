FROM ubuntu

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm #git git-core

#ADD * /api/

RUN chmod +x /api/lib/server.js

CMD node /api/lib/server.js