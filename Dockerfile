FROM node:12

WORKDIR /opt/app
COPY ./package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 80
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /opt/app/dist/saveup-frontend /usr/share/nginx/html