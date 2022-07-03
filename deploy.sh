#!/bin/bash
# 确保脚本抛出遇到的错误
set -e
# 个人博客前端
remoteImages[0]="registry.cn-guangzhou.aliyuncs.com/hezhijian/learning-platform-web"
localImages[0]="learning-platform-web"
ports[0]="5000"
linkContainer[0]="learning"

# 个人博客后端镜像
remoteImages[1]="registry.cn-guangzhou.aliyuncs.com/hezhijian/learning"
localImages[1]="learning"
ports[1]="8000"
linkContainer[1]="learningSql"

#remoteImages[2]="registry.cn-guangzhou.aliyuncs.com/hezhijian/diagram-web"

for(( i=0; i < ${#remoteImages[@]}; i++))
#${#array[@]}获取数组长度用于循环
do
  echo "$i.${remoteImages[i]}";
done;
echo -n "选择你要部署的docker镜像:"
selectData=0
selectImage=${remoteImages[$selectData]}
echo "你选择的是$selectImage"

# 判断镜像是否存在，如果存在直接删除
if [[ -n $(sudo docker images -q "$selectImage") ]]
then
  echo "存在${selectImage}镜像,即将删除镜像"
  sudo docker image rm "$selectImage":latest
else
  echo "不存在${selectImage}镜像"
fi

# 重新拉取镜像
echo "重新拉取${selectImage}镜像"
sudo docker pull "$selectImage"
#
# 判断容器是否在运行，在的话停掉运行的容器
echo "判断${localImages[$selectData]}容器是否在运行，在的话停掉运行的容器"
if [[ -n $(sudo docker ps -q -f "name=^${localImages[$selectData]}") ]]
then
  echo "${localImages[$selectData]}容器正在运行，即将停用该容器"
  sudo docker stop "${localImages[$selectData]}"
  sudo docker rm "${localImages[$selectData]}"
else
  echo "${localImages[$selectData]}容器不存在"
fi

# 将镜像删除
echo "判断${localImages[$selectData]}镜像是否存在"
if [[ -n $(sudo docker images -q "${localImages[$selectData]}") ]]
then
  echo "${localImages[$selectData]}镜像存在，即将删除该镜像"
  sudo docker image rm "${localImages[$selectData]}":latest
else
  echo "不存在${localImages[$selectData]}镜像"
fi

# 将拉取最新的镜像改名
echo "将拉取的${selectImage}改名为${localImages[$selectData]}"
imageId=$(sudo docker images -q "$selectImage")
echo "${imageId}"
sudo docker tag "${imageId}" "${localImages[$selectData]}"
# 运行镜像
sudo docker run --name "${localImages[$selectData]}" -p "${ports[$selectData]}":80 -d --link "${linkContainer[$selectData]}:${linkContainer[$selectData]}" "${localImages[$selectData]}"

