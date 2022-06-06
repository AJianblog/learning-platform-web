FROM nginx:1.20.2

COPY ./default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY ./learning-platform-web /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
