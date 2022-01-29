const handleBlogRoute = require('./src/routes/blog')
const querystring = require('querystring')

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
    })
}

module.exports = serverHandler