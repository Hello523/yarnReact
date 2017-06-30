#!/bin/bash

npm run build

build_dir=kr-init

if [ $1 = 'prod01' ]; then
rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/${build_dir}/
elif [ $1 = 'prod02' ]; then
rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/${build_dir}/
elif [ $1 = 'all' ]; then
rsync -rvltOD ./dist/* ali-krspace-web-01:/data/work/${build_dir}/
rsync -rvltOD ./dist/* ali-krspace-web-02:/data/work/${build_dir}/
fi
