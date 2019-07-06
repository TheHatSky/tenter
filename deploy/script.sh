rm -rf ./node_modules
rm -rf ./.git
rm -rf ./deploy 
rm -rf ./js
rm -rf ./utils
rm -rf ./typings
tar -czf release.tar.gz ./*
sshpass -p $PASSWORD scp ./release.tar.gz $USERNAME@178.128.194.146:./release.tar.gz
sshpass -p $PASSWORD ssh $USERNAME:$PASSWORD@178.128.194.146 tar -xf release.tar.gz -C /var/www/tenter.me/html/
sshpass -p $PASSWORD ssh $USERNAME:$PASSWORD@178.128.194.146 "cd /var/www/tenter.me/html/ && node ./dist/utils.js"
sshpass -p $PASSWORD ssh $USERNAME:$PASSWORD@178.128.194.146 rm /var/www/tenter.me/html/dist/utils.js
