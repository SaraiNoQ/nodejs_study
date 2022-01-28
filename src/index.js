const http = require('http');
// 将query参数转化为JSON对象的module
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let postData = '';

        // transfer by stream
        // 当在传输data时，往postData中增加stream
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        // 当传输完毕时，客户端获取postData
        req.on('end', () => {
            console.log('postData', postData);
            // 返回给前端
            res.end('数据接收完毕');
        });

        console.log('post data content type', req.headers['content-type']);
    }
});

server.listen(5000, () => {
    console.log('server running at port 5000');
});