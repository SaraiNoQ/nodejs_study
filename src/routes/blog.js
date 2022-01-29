const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { getList, getDetail, createNewBlog, updateBlog, deleteBlog } = require('../controller/blog')

const handleBlogRoute = (req, res) => {
    const method = req.method
    const id = req.query.id || ''
    const blogData = req.body

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
}

module.exports = handleBlogRoute