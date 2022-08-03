FROM certbot/certbot

WORKDIR /cron

RUN apk update && apk upgrade --available && sync

COPY cert-renew-script.sh .

# Give executable permissions to script
RUN chmod +x cert-renew-script.sh .

# Adding crontab to the appropriate location
ADD crontab /etc/cron.d/my-cron-file

# Giving permission to crontab file
RUN chmod 0644 /etc/cron.d/my-cron-file

# Running crontab
RUN crontab /etc/cron.d/my-cron-file

# Creating entry point for cron 
ENTRYPOINT ["cron", "-f"]

