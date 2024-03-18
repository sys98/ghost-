如果你有一个用ghost平台搭建的博客，使用插件后，博客上传的媒体文件将存储在[又拍云](https://www.upyun.com/)而不是本地


# 安装 
相关接口文档可阅读[ghost开发者文档](https://ghost.org/docs/config/)、[又拍云接口文档](https://api.upyun.com/doc#/api/guide/overview)



# 步骤

- 在 `content`目录下创建`adapters/storage`文件夹，并进入该目录
- 克隆本仓库
```
cd [path/to/ghost]/content/adapters/storage
git clone https://github.com/pupboss/ghost-upyun-store.git
```



- 安装依赖
```
cd ghost-upyun-store
npm i
```

# 修改配置文件
```json
{
  // ...
  "storage": {
    "active": "ghost-upyun-store",
    "ghost-upyun-store": {
      "bucket": "YOUR BUCKET NAME",
      "operator": "OPERATOR NAME",
      "password": "PASSWORD",
      "domain": "https://cdn.xxxxx.com",
      "prefix": "your/folder/",
      "folder": "YYYY/MM/",
      "suffix": ""
    }
  },
  // ...
}
```
请注意，prefix 和 folder 的值必须以 和 开头。//

# 许可证
```
The MIT License (MIT)

Copyright (c) 2017 Li Jie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
