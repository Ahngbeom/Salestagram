FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

RUN apk add uwsgi-python3

VOLUME [ "/etc/nginx" ]

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]