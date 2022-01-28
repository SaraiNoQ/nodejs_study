const handleBlogRoute = require('./src/routes/blog')
const querystring = require('querystring')

const serverHandler = (req, res) => {
    // 设置响应格式
    res.setHeader('Content-Type', 'application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析query
    req.query = querystring.parse(url.split('?')[1])
    // 调用处理blog路由的方法
    const blogData = handleBlogRoute(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return;
    }
    // 404页面
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 not found')
    res.end()
}

module.exports = serverHandler