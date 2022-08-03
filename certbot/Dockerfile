FROM certbot/certbot

# cron job default directory
WORKDIR /root
    
RUN apk update && apk upgrade --available && sync

# Create logs dir
RUN mkdir /root/logs

COPY cert-renew-script.sh .

# Give executable permissions to script
RUN chmod +x cert-renew-script.sh .

# Adding crontab to the appropriate location
ADD crontab /etc/cron.d/my-cron-file

# Giving permission to crontab file
RUN chmod 0644 /etc/cron.d/my-cron-file

# Running crontab to add my-cron-file cron jobs to cron tab
RUN crontab /etc/cron.d/my-cron-file

# Creating entry point for cron 
ENTRYPOINT ["crond", "-f"]

