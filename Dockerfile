# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
ENV VITE_APP_API_URL=${VITE_API_URL}
ENV VITE_APP_JWT_TOKEN=${VITE_JWT_TOKEN}
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]