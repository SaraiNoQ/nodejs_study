// blog相关的方法
const getList = (author, keyword) => {
    // 要连接数据库
    return [
        {
            id: 1,
            title: 'title-1',
            content: 'content-1',
            author: 'zhangsan',
            createdAt: 1643389600898
        },
        {
            id: 1,
            title: 'title-1',
            content: 'content-1',
            author: 'zhangsan',
            createdAt: 1643389617211
        }
    ]
}

module.exports = {
    getList
}