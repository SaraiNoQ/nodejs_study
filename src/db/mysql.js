const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

const connection = mysql.createConnection(MYSQL_CONFIG)

connection.connect()

// const sql = `select * from blogs`
// connection.query(sql, (err, result) => {
//     if (err) {
//         console.log(err)
//         return;
//     }
//     console.log(result)
// })

// 封装执行SQL语句的方法
function execSQL(sql) {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                resolve(err)
                return;
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    execSQL
}