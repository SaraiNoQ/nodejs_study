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