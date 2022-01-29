const fs = require('fs')
const path = require('path')

// 常规写法（容易产生回调地狱）
// function getFileContent(filename, callback) {
//     // 获取文件绝对地址
//     const fullFilename = path.resolve(__dirname, 'data', filename)
//     // 读取文件
//     fs.readFile(fullFilename, (err, data) => {
//         if (err) {
//             console.error(err)
//             return;
//         }
//         callback(
//             JSON.parse(data)
//         )
//     })
// }
// getFileContent('a.json', (aData) => {
//     console.log(aData)
//     getFileContent(aData.next, (bData) => {
//         console.log(bData)
//         getFileContent(bData.next, (cData) => {
//             console.log(cData)
//         })
//     })
// })

// Promise写法
function getFileContent(filename) {
    const promise = new Promise((resolve, reject) => {
        // 获取文件绝对地址
        const fullFilename = path.resolve(__dirname, 'data', filename)
        // 读取文件
        fs.readFile(fullFilename, (err, data) => {
            if (err) {
                reject(err)
                return;
            }
            resolve (
                JSON.parse(data.toString())
            )
        })
    })

    return promise
}
// aData为err或者时data.toString()
getFileContent('a.json').then((aData) => {
    console.log(aData)
    // 返回一个promise
    return getFileContent(aData.next)
}).then((bData) => {
    console.log(bData)
    return getFileContent(bData.next)
}).then((cData) => {
    console.log(cData)
})