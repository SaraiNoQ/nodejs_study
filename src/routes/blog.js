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
        const listDataPromise = getList(author, keyword)
        return listDataPromise.then(result => {
            // 利用从数据库中取得的数据构建对应的响应model
            // 在promise.then()中return的数据无法返回给主函数，需要.then返回
            // promise.then(return A) 会使这个整体变成A类型
            return new SuccessModel(result)
        })
    }
    // 获取博客详情
    if (method == 'GET' && req.path == '/api/blog/detail') {
        const detailDataPromise = getDetail(id)
        return detailDataPromise.then(result => {
            // 查询结果为一个数组，传入数组第一个元素
            return new SuccessModel(result[0])
        })
    }
    // 新增博客
    if (method == 'POST' && req.path == '/api/blog/new') {
        const newBlogDataPromise = createNewBlog(blogData)
        // blogData中的author是当前页面登录的用户
        return newBlogDataPromise.then(id => {
            return new SuccessModel(id)
        })
    }
    // 更新博客
    if (method == 'POST' && req.path == '/api/blog/update') {
        const updateBlogDataPromise = updateBlog(id, blogData)
        return updateBlogDataPromise.then(updateStatus => {
            if (updateStatus) {
                return new SuccessModel('更新博客成功!')
            } else {
                return new ErrorModel('更新博客失败!')
            }
        })
    }
    // 删除博客
    if (method == 'POST' && req.path == '/api/blog/delete') {
        const deleteBlogDataPromise = deleteBlog(id, blogData) 
        return deleteBlogDataPromise.then(deleteStatus => {
            if (deleteStatus) {
                return new SuccessModel('删除博客成功!')
            } else {
                return new ErrorModel('删除博客失败!')
            }
        })
    }
}

module.exports = handleBlogRoute