# data-ingress-example-node

### Install Docker 

* Install [docker](https://www.docker.com/community-edition)
* Install [docker-compose](https://docs.docker.com/compose/install/)

If you don't know docker, [skim through a few tutorials](https://docker-curriculum.com/), with a goal to understand:

* What is a docker container and how is it different from a VM?
* How do I build a docker image?
* How do I run docker with docker-compose?

### Development

Use the `fullstack` container, get a shell in it and install initial dependencies for npm:

```bash
./local build fullstack   # build image as a shared volume container (such as for developing locally)
./local up fullstack -d   # run a shell as the local shared volume container
./local sh fullstack      # get a shell in the (now up) fullstack/leo-bus container
npm install             # this last is run within the container
node index.js           # Run the program to push an event/object
```

### Local Testing

From a container shell (`./local sh fullstack`) run:

```bash
npm install; npm test;
```

Refer to [leo-bus](https://github.com/iCentris/leo-bus) for additional documentation
