#!/bin/bash

npm run build

target_site=www@10.1.60.201
target_site_port=9830
build_dir=kr-init

if [ $1 = 'test01' ]; then
  target_site=www@114.215.78.9
  target_site_port=22
elif [ $1 = 'test02' ]; then
    target_site=www@114.215.78.48
    target_site_port=22
elif [ $1 = 'test' ]; then
    target_site=www@10.1.60.201
    target_site_port=9830
fi

echo $target_site

rsync -cza --delete-before  -e "ssh -p ${target_site_port}"  ./build/* ${target_site}:/data/work/frontend/${build_dir} >/dev/null
