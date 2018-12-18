FROM node:8.11-alpine

WORKDIR /app/data-ingress-example/src

ARG UID
ARG GID
ENV GROUP=bot
ENV USER=bot

# core requirements
# pulled: {libre/open}ssl-dev
RUN apk add --no-cache vim &&\
    if [ ! "$UID" -o ! "$GID" ]; then echo "Missing --build-args: UID and GID"; exit 1; fi; \
    cur_usr=$(getent passwd ${UID}|cut -d: -f1 2>/dev/null); \
    if [ $cur_usr ]; then deluser $cur_usr;  fi; \
    cur_grp=$(getent group ${GID}|cut -d: -f1 2>/dev/null) ; \
    if [ $cur_grp ]; then delgroup $cur_grp; fi;\
    addgroup -g $GID $GROUP &&\
    adduser -D -h /app -s /bin/bash -u $UID -G $GROUP $USER

RUN chown -R ${UID}:${GID} /app

# local shell requirements
RUN apk add --no-cache bash openssh curl tar

USER $USER
