echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to /var/www/192.168.65.96..."
sudo rm -rf /var/www/192.168.65.96/*
sudo cp -r build/* /var/www/192.168.65.96/

echo "Done!"