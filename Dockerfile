# #build stage
# FROM node:18-alpine AS build
# RUN mkdir -p /var/app
# WORKDIR /var/app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build



# #prod stage
# FROM node:18-alpine
# WORKDIR /var/app
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# COPY --from=build /var/app/dist ./
# COPY package*.json ./
# RUN npm install --only=production
# RUN rm package*.json
# EXPOSE 3000
# CMD ["node", "dist/main.js"]


FROM node:18
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]