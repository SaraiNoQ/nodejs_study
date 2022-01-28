const http = require('http')

const PORT = 5000

const serverHandler = require('../app')

const server = http.createServer(serverHandler)

server.listen(PORT, () => {
    console.log('server is running at port 5000...')
})

