
FROM frabrooks/vibrant-lighthouse-ng-app:latest

FROM nginx:1.23.0-alpine

COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
