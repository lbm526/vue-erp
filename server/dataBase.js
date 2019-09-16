const mongoose = require('mongoose')

if (process.env.NODE_ENV === "production") {
  mongoose.connect('mongodb://localhost:27017/informationSystem') // 此处改为mongodb Atlas上的字段码
} else {
  mongoose.connect('mongodb://localhost:27017/informationSystem')
}
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('mongodb启动成功')
})
conn.on('error', console.error.bind(console, '连接数据库失败'))

module.exports = mongoose
