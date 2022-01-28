/**
 * data 从数据库中取出的数据
 * 前端根据errno的值判断是否成功取到数据
 * SuccessModel 获取成功的模型
 * ErrorModel 获取失败的模型 
 */
class BaseModel {
    constructor(data, message) {
        if (typeof data == 'String') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor (data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}