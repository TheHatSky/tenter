rm -rf ./node_modules
rm -rf ./.git
rm -rf ./deploy 
tar -czf release.tar.gz ./*
sshpass -p $PASSWORD scp ./release.tar.gz $USERNAME@178.128.194.146:./release.tar.gz
sshpass -p $PASSWORD ssh $USERNAME:$PASSWORD@178.128.194.146 tar -xf release.tar.gz -C /var/www/tenter.me/html/
