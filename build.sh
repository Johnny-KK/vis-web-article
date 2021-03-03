VUE_APP_NAME="vis-web-article"
VUE_APP_RELEASE_VERSION="0.0.2"

source .env
docker_user="vis"
docker_pwd="visPower@2021"
docker_project="vis"
docker_domain="ub20-docker.com"

echo "node version: \c"
node -v
echo "npm version: \c"
npm -v
echo "vue version: \c"
vue -V
echo "docker version: \c"
docker -v

npm i --verbose

npm run build

docker login --username=${docker_user} --password=${docker_pwd} ${docker_domain}

docker build -t ${docker_domain}/${docker_project}/${VUE_APP_NAME}:${VUE_APP_RELEASE_VERSION} .

docker image ls ${VUE_APP_NAME}

docker push ${docker_domain}/${docker_project}/${VUE_APP_NAME}:${VUE_APP_RELEASE_VERSION}