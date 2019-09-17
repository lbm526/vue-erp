const express = require('express')
const bodyParser = require('body-parser') // 处理前端post过来的数据
const path = require('path')
const router = require('./Interface')
const timeout = require('connect-timeout') // 请求超时
const app = express()

require('./dataBase') // 连接数据库

app.use(express.static(path.join(__dirname, 'dist'))) // 初始启动的html文件夹

app.use(bodyParser.json()) // 解析 x-www-form-urlencoded,extended为false时数据为String或Array,true则是所有数据
app.use(bodyParser.urlencoded({
    extended: true
}))

// 请求超时处理
app.use(timeout('3s'))
app.use(haltOnTimedout)

function haltOnTimedout(req, res, next) {
    if (!req.timedout) {
        //   res.status(503).send()
        next()
    } else {
        res.json('请求超时,请通知服务器人员检查服务器！')
    }
}
app.use(router) // 运行api

const port = process.env.PORT || 8088;
var host = process.env.host || '127.0.0.1'

app.listen(port, () => {
    console.log(`
    Serve is running~
    network:http://${host}:${port}`)
})