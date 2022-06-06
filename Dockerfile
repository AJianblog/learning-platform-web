FROM nginx:1.20.2

COPY ./build/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*

COPY ./dist/learning-platform-web /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
