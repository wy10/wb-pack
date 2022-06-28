const loaderUtils = require('loader-utils')
// loader 就是一个函数
// 使用loader1 将js文件中所有的今天替换成明天
module.exports = function(source) {
  // loader处理完之后需要把处理的结果返回
  return source.replace(/今天/g,this.query.name)
}