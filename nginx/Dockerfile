FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

VOLUME [ "/etc/nginx" ]

# EXPOSE 80

# STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]