// blog相关的方法
// 连接数据库
const { execSQL } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
    // 根据url中的query生成对应的sql语句，返回查询的promise
    let sql = `select * from blogs where true `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and (title like '%${keyword}%' or content like '%${keyword}%')`
    }
    return execSQL(sql)
}

// 获取博客详情
const getDetail = (id) => {
    // id为空时返回id=''的数据
    // 通过前端来控制不为空
    let sql = `select * from blogs where id='${id}'`
    return execSQL(sql)
}

// 创建新的博客
const createNewBlog = (blogData) => {
    // blogData title content数据存到数据库，再返回id
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createAt = Date.now()

    const sql = `insert into blogs(title, content, author, createAt) values('${title}', '${content}', '${author}', '${createAt}');`

    return execSQL(sql).then(insertResult => {
        return {
            id: insertResult.insertId
        }
    })
}

// 更新博客
const updateBlog = (id, blogData) => {
    // id 和 blogData由前端来控制不为空
    const title = blogData.title
    const content = blogData.content
    // author由前端传过来，当author或者id和要进行操作的数据项不匹配时，无法操作该数据
    const author = blogData.author
    const sql = `update blogs set title='${title}', content='${content}' where id='${id}' and author='${author}';`
    return execSQL(sql).then(updateResult => {
        if (updateResult.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
}

// 删除博客
const deleteBlog = (id, blogData) => {
    const author = blogData.author
    const sql = `delete from blogs where id='${id} and author='${author}';`
    return execSQL(sql).then(deleteResult => {
        if (deleteResult.affectedRows > 0) {
            return true
        } else {
            return false
        }
    })
} 
module.exports = {
    getList,
    getDetail,
    createNewBlog,
    updateBlog,
    deleteBlog
}