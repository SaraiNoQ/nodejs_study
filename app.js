const handleBlogRoute = require('./src/routes/blog')
const querystring = require('querystring')
const { resolve } = require('path')

// 处理POST请求
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        // 当post数据不为空时，resolve出非空对象
        if (req.method !== 'POST') {
            resolve('HTTP request is not POST!')
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve('content-type is wrong!')
            return;
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve('POST content is null!')
                return;
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}

const serverHandler = (req, res) => {
    // 设置响应格式
    res.setHeader('Content-Type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 处理post数据
    getPostData(req).then((postData) => {
        // 在req中设置post过来的数据，让handleBlogRoute函数能调用到该数据
        req.body = postData

        // 调用处理blog路由的方法
        const blogData = handleBlogRoute(req, res)
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return;
        }
        // 没调到路由，返回出404页面
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.write('404 not found')
        res.end()
    })
}

module.exports = serverHandler