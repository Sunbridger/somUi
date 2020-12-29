#!/usr/bin/env sh
set -e
git checkout master
git merge develop

REMOTE_SERVER=souche@10.165.13.29
SOURCE_FILES=./lib/*
DOCS_SOURCE_FILES=./examples/dist/*

PROJECT_PATH=/home/souche/online/souche-f2e/projects/som-ui
ONLINE_PATH=$PROJECT_PATH/$VERSION

echo "正在编译 $VERSION ..."

# build
npm install --registry=http://registry.npm.souche-inc.com
./node_modules/.bin/lerna bootstrap --ignore @souche-ui/som-video-player --npm-client npm --registry=http://registry.npm.souche-inc.com
VERSION=$VERSION npm run build
./node_modules/.bin/lerna publish --ignore @souche-ui/som-video-player --repo-version $VERSION --npm-tag=$TAG

# CDN
ssh $REMOTE_SERVER "mkdir -p $ONLINE_PATH/www"
rsync -rvI --delete-after --progress $SOURCE_FILES $REMOTE_SERVER:$ONLINE_PATH

# deploy docs
echo "正在部署文档..."
ssh $REMOTE_SERVER "mkdir -p $PROJECT_PATH/www"
rsync -rvI --delete-after --progress $DOCS_SOURCE_FILES $REMOTE_SERVER:$ONLINE_PATH/www
rsync -rvI --delete-after --progress $DOCS_SOURCE_FILES $REMOTE_SERVER:$PROJECT_PATH/www

# commit
git add -A
git commit -m "chore(build): $VERSION"
npm version $VERSION --message "chore(package.json): bump version to $VERSION"

# publish
git push origin master
git push origin refs/tags/v$VERSION
git checkout develop
git rebase master
git push origin develop

snpm publish

# clog

# npm run clog
# git add -A
# git commit -m "chore(docs): update changelog"
# git push origin develop

echo
echo "文档部署成功，请访问以下地址。"
echo "最新版本文档：https://assets.souche.com/projects/som-ui/www/index.html"
echo "指定版本文档：https://assets.souche.com/projects/som-ui/$VERSION/www/index.html"
echo
echo "$VERSION 发布成功."
