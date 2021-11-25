#!/usr/bin/env zsh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn run build:github

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy to the gh-pages'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:xinlei3166/vite-vue-template.git master:gh-pages
