# tag
# https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE

# fireFox打包源码问题
# 使用pack打包zip，再将zip解压，然后进行打包。 上传到firefox，说不定可以解决打包不一致的问题

# git tag -a 'v0.0.12' -m 'tag信息'
# git push origin --tags
# git tag

# git tag -l | xargs git tag -d #删除所有本地分支
# git fetch origin --prune #从远程拉取所有信息
