// blog相关的方法

// 获取博客列表
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
            id: 2,
            title: 'title-1',
            content: 'content-1',
            author: 'zhangsan',
            createdAt: 1643389617211
        }
    ]
}

// 获取博客详情
const getDetail = (id) => {
    if (id !== null && id !== '') {
        return  {
            title: 'title-1',
            content: 'content-1',
            author: 'zhangsan',
            createdAt: 1643389617211
        }
    } else {
        return null
    }
}

// 创建新的博客
const createNewBlog = (blogData) => {
    console.log('create new blog:', blogData)
    // blogData title content数据存到数据库，再返回id
    return {
        id: 1
    }
}

// 更新博客
const updateBlog = (id, blogData) => {
    console.log('upadate blog:', id, blogData)
    if (id && blogData) {
        return true
    } else {
        return false
    }
}

// 删除博客
const deleteBlog = (id) => {
    console.log('delete blog:', id)
    if (id) {
        return true
    } else {
        return false
    }
} 
module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}