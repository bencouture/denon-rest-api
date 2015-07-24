FROM ubuntu

# make sure apt is up to date
RUN apt-get update

# install nodejs and npm
RUN apt-get install -y nodejs npm #git git-core

ADD lib/* /api/

RUN chmod +x /api/server.js

EXPOSE 8000

CMD /usr/local/bin/node /api/