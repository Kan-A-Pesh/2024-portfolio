domain="https://kan-a-pesh.fr"
changeFreq="monthly"
lastMod=$(date +%Y-%m-%d)

echo "Building for $domain"

echo "Cleaning dist"
rm -rf ./dist

echo "Copying static files"
cp -r ./src ./dist

echo "Installing static-i18n"
npm install -g static-i18n

echo "Building static-i18n"
static-i18n --output-dir ./dist --localesPath ./locales --l en -d src \
    --i en \
    --i fr \
    --i es \
    --i de \
    --i it \
    --i zh \
    --i ja \
    --i ko \
    .

cd ./dist

echo "Installing temporary server"
npm install -g serve

echo "Creating temporary server"
screen -dmS tempserver serve -l 30000

echo "Generating sitemap"
npx sitemap-generator-cli http://localhost:30000 --change-freq $changeFreq --last-mod $lastMod -v 

# Escape slashes in domain
domain=$(echo $domain | sed 's/\//\\\//g')
# Replace localhost with domain
sed -i 's/http:\/\/localhost:30000/'$domain'/g' sitemap.xml

echo "Cleaning temporary server"
screen -XS tempserver quit

echo "Done"