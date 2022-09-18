FROM certbot/certbot

# Set working directory
WORKDIR /root
    
RUN apk update && apk upgrade --available && sync

COPY cert-renew-script.sh .

# Give executable permissions to script
RUN chmod +x cert-renew-script.sh .

# Adding crontab to the appropriate location
COPY crontab /etc/cron.d/my-cron-file

# Giving permission to crontab file
RUN chmod 0644 /etc/cron.d/my-cron-file

# Running crontab to add my-cron-file cron jobs to cron tab
RUN crontab /etc/cron.d/my-cron-file

# Copy entrypoint script
COPY docker-entry-point.sh /

# Copy ssl.conf for nginx SSL certificate configuration
COPY ssl.conf /

# Set permissions for ssl.conf
RUN chmod 0644 /ssl.conf

# Entry point
ENTRYPOINT ["/docker-entry-point.sh"]

