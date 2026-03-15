#!/bin/sh
set -eu

envsubst '${FRONTEND_API_URL} ${FRONTEND_COGNITO_USER_POOL_ID} ${FRONTEND_COGNITO_APP_CLIENT_ID}' \
  < /opt/quad-todo/runtime-config.template.js \
  > /usr/share/nginx/html/assets/runtime-config.js
