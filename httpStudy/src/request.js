// 处理http请求
const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const query = querystring.parse(url.split('?')[1]);
    const responseData = {
        method,
        url,
        path,
        query
    };
    res.setHeader('Content-Type', 'application/json');
    if (method === 'GET') {
        res.end(
            JSON.stringify(responseData)
        )
    }
    if (method === "POST") {
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            responseData.postData = postData;
            // 返回给前端
            res.end(
                JSON.stringify(responseData)
            );
        });
    }
});

server.listen(5000, () => {
    console.log('server running at port 5000');
})