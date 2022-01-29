# NodeJS之搭建web服务器

## NodeJS处理HTTP(GET && POST)请求

1. httstudy/src文件夹中

## 搭建开发环境

1. 目录结构：

   ├─config	系统配置
   │      db.js	数据库配置
   │
   ├─controller	控制层
   │      blog.js	根据请求数据从数据库中取数据
   │
   ├─db	连接数据库
   │      mysql.js	
   │
   ├─model	构建数据的结构类
   │      responseModel.js	响应数据
   │
   └─routes	路由设置
           blog.js	对不同接口和不同请求返回对应数据

   

2. ./app.js：入口文件

## 初始化路由

```javascript
const { SuccessModel } = require('../model/responseModel')
const { getList } = require('../controller/blog')

const handleBlogRoute = (req, res) => {
    const method = req.method
    if (method == 'GET' && req.path == '/api/blog/list') {
        // 解析参数 /api/blog/list?query
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 从数据库中取出参数对应的数据
        const listData = getList(author, keyword)
        // 利用从数据库中取得的数据构建对应的响应model
        return new SuccessModel(listData)
    }
    if (method == 'GET' && req.path == '/api/blog/detail') {
        return {
            message:'获取博客详情的接口'
        }
    }
    if (method == 'POST' && req.path == '/api/blog/new') {
        return {
            message:'新建博客的接口'
        }
    }
    if (method == 'POST' && req.path == '/api/blog/update') {
        return {
            message:'更新博客的接口'
        }
    }
    if (method == 'POST' && req.path == '/api/blog/delete') {
        return {
            message:'删除博客列表的接口'
        }
    }
}

module.exports = handleBlogRoute
```

## 开发路由

## 处理异步代码：promise的使用

## 处理POST数据

```jsx
// 处理POST请求
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 当post数据不为空时，resolve出非空对象
        if (req.method !== 'POST') {
            resolve({})
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return;
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
```

## 开发 新建、更新、删除 BLOG的路由

```jsx
// 获取博客列表
    if (method == 'GET' && req.path == '/api/blog/list') {
        // 解析参数 /api/blog/list?query
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 从数据库中取出参数对应的数据
        const listData = getList(author, keyword)
        // 利用从数据库中取得的数据构建对应的响应model
        return new SuccessModel(listData)
    }
    // 获取博客详情
    if (method == 'GET' && req.path == '/api/blog/detail') {
        const detailData = getDetail(id)
        if (detailData) {
            return new SuccessModel(detailData)
        } else {
            return new ErrorModel(detailData)
        }
    }
    // 新增博客
    if (method == 'POST' && req.path == '/api/blog/new') {
        const newBlogData = createNewBlog(blogData)
        return new SuccessModel(newBlogData)
    }
    // 更新博客
    if (method == 'POST' && req.path == '/api/blog/update') {
        const updateBlogData = updateBlog(id, blogData)
        if (updateBlogData) {
            return new SuccessModel('更新博客成功!')
        } else {
            return new ErrorModel('更新博客失败!')
        }
    }
    // 删除博客
    if (method == 'POST' && req.path == '/api/blog/delete') {
        const deleteBlogData = deleteBlog(id) 
        if (deleteBlogData) {
            return new SuccessModel('删除博客成功!')
        } else {
            return new ErrorModel('删除博客失败!')
        }
    }
```

## 使用MySQL

(Create && Retrieve && Update && Delete)：mysql的基本操作

## NodeJS连接MySQL：

./db/mysql.js

## 封装执行SQL语句的工具函数

## 获取BLOG列表接口对接MySQL

## BLOG详情、新建BLOG接口对接MySQL

```jsx
// promise.then()方法返回值问题：
controller/blog.js
const getList = (author, keyword) => {
    // 根据url中的query生成对应的sql语句，返回查询的promise
    let sql = `select * from blogs where true `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and (title like '%${keyword}%' or content like '%${keyword}%')`
    }
    return execSQL(sql)
}

routes/blog.js
// 获取博客列表
    if (method == 'GET' && req.path == '/api/blog/list') {
        // 解析参数 /api/blog/list?query
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // 从数据库中取出参数对应的数据
        const listDataPromise = getList(author, keyword)
        return listDataPromise.then(result => {
            // 利用从数据库中取得的数据构建对应的响应model
            // 在promise.then()中return的数据无法返回给主函数，需要.then返回
            // promise.then(return A) 会使这个整体变成A类型
            return new SuccessModel(result)
        })
    }

app.js
// 调用处理blog路由的方法
        const blogDataPromise = handleBlogRoute(req, res)
        // 根据sql语句构建对应的model，当sql语句查询结果为空时，构建出的model中message也为空
        if (blogDataPromise) {
            blogDataPromise.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return;
        }
        
        // 没调到路由，返回出404页面
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 not found')
        res.end()
```

## 更新BLOG、删除BLOG接口对接MySQL