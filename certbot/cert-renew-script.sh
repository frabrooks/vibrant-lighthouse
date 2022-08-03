#!/bin/sh
echo "Current date and time is " "$(date +%D-%H:%M)"

echo "Running 'certbot renew', time is " "$(date +%D-%H:%M)" >> /var/log/letsencrypt/letsencrypt.log

certbot renew

echo "Ran 'certbot renew', time is " "$(date +%D-%H:%M)" >> /var/log/letsencrypt/letsencrypt.log
