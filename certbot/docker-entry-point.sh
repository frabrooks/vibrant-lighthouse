certbot certonly --webroot -w /var/www/certbot/ --non-interactive --agree-tos --domains eisentodo.com --email fraserliambrooks@outlook.com;
certbot certonly --webroot -w /var/www/certbot/ --non-interactive --agree-tos --domains api.eisentodo.com --email fraserliambrooks@outlook.com;
cp /ssl.conf /etc/letsencrypt/;
crond -f