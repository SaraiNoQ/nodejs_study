const http = require('http');

const server = http.createServer((req, res) => {
    const method = req.method;
    console.log(method);
    const url = req.url;
    console.log(url);
});

server.listen(5000, () => {
    console.log('server running at port 5000');
});