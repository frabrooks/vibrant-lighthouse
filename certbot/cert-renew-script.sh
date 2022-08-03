#!/bin/sh
echo "Running 'certbot renew' at " "$(date +%D-%H:%M)"

certbot renew
