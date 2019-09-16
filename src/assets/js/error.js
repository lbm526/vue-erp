import {
  MessageBox
} from 'element-ui'

// 封装检测函数
class Error {
  constructor() {}
  listen(message) {
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
      if (message) {
        MessageBox({
          center: true,
          title: message,
          type: 'error',
          closeOnClickModal: false,
          confirmButtonText: '确定'
        })
        return false
      }
      resolve()
    })
  }
}
export default Error
