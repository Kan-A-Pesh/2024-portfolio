if [ -z "$1" ]
  then
    echo "No domain supplied"
    exit 1
fi

domain=$1
changeFreq="monthly"
lastMod=$(date +%Y-%m-%d)

echo "Building for $domain"

echo "Cleaning dist"
rm -rf ./dist

echo "Copying static files"
cp -r ./src ./dist

echo "Building static-i18n"
npx static-i18n --output-dir ./dist --localesPath ./locales --l en -d src \
    --i en \
    --i fr \
    .

cd ./dist

echo "Creating temporary server"
screen -dmS tempserver npx serve -l 30000

echo "Generating sitemap"
npx sitemap-generator-cli http://localhost:30000 --change-freq $changeFreq --last-mod $lastMod -v 

# Escape slashes in domain
domain=$(echo $domain | sed 's/\//\\\//g')
# Replace localhost with domain
sed -i 's/http:\/\/localhost:30000/'$domain'/g' sitemap.xml

echo "Cleaning temporary server"
screen -XS tempserver quit

echo "Done"
