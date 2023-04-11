#!/bin/bash

# 部署步骤
# 1. 判断容器是否在运行，在运行的话停止
# 2. 删掉要创建的镜像
# 3. 创建镜像
# 4. 运行镜像
runContainerName="learning-platform-web"
ports="5000"
linkContainer="learning"

# 判断容器是否在运行，在的话停掉运行的容器
echo "判断${runContainerName}容器是否在运行，在的话停掉运行的容器"
if [[ -n $(sudo docker ps -q -f "name=^${runContainerName}") ]]
then
  echo "${runContainerName}容器正在运行，即将停用该容器"
  sudo docker stop "${runContainerName}"
  sudo docker rm "${runContainerName}"
else
  echo "${runContainerName}容器不存在, 无需停止"
fi


# 将镜像删除
echo "判断${runContainerName}镜像是否存在"
if [[ -n $(sudo docker images -q "${runContainerName}") ]]
then
  echo "${runContainerName}镜像存在，即将删除该镜像"
  sudo docker image rm "${runContainerName}":latest
else
  echo "不存在${runContainerName}镜像"
fi

echo "开始创建镜像"
sudo docker build -f Dockerfile -t "${runContainerName}" .
# 运行镜像， 用了别名，在nginx可以使用别名
sudo docker run --name "${runContainerName}" -p "${ports}":80 -d --link "${linkContainer}:${linkContainer}" "${runContainerName}"
