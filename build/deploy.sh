#!/usr/bin/env sh
set -e

REMOTE_SERVER=souche@10.165.13.29
DOCS_SOURCE_FILES=./examples/dist/*

PROJECT_PATH=/home/souche/online/souche-f2e/projects/som-ui
ONLINE_PATH=$PROJECT_PATH/$VERSION

echo "正在编译 $VERSION ..."

# build
npm install --registry=http://registry.npm.souche-inc.com
VERSION=$VERSION npm run deploy:build

# deploy docs
echo "正在部署文档..."
ssh $REMOTE_SERVER "mkdir -p $ONLINE_PATH/www"
ssh $REMOTE_SERVER "mkdir -p $PROJECT_PATH/www"
rsync -rvI --delete-after --progress $DOCS_SOURCE_FILES $REMOTE_SERVER:$ONLINE_PATH/www
rsync -rvI --delete-after --progress $DOCS_SOURCE_FILES $REMOTE_SERVER:$PROJECT_PATH/www

echo
echo "文档部署成功，请访问以下地址。"
echo "最新版本文档：https://assets.souche.com/projects/som-ui/www/index.html"
echo "指定版本文档：https://assets.souche.com/projects/som-ui/$VERSION/www/index.html"
echo
echo "$VERSION 发布成功."
