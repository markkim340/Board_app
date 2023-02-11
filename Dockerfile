FROM node:19
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3333
CMD ['node', 'dist/main.js']