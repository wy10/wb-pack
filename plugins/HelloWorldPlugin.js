const fs = require('fs')
const cheerio = require('cheerio')
const path = require('path')
// 1.构造函数 2.prototype中需要一个apply方法
/*
1. 编写自定义插件，注册afterEmit钩子
2. 根据创建对象时传入的template属性来读取html模板
3. 使用工具分析html,推荐使用cheerio,可以直接使用jquery api dom操作
4. 循环遍历webpack打包的资源文件列表，如果又多个bundle就都打包进去
5. 输出新生成的html字符串到dist目录中
*/
class HelloWorldPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // 通过compiler 对象可以注册对应事件
    compiler.hooks.afterEmit.tap('HelloWorldPlugin',(compilation)=>{
      let result = fs.readFileSync(path.join(process.cwd(),this.options.template),'utf-8')
      const $ = cheerio.load(result)
      Object.keys(compilation.assets).forEach(item=>{
        $(`<script src="${item}"></script>`).appendTo('body')
      })
      fs.writeFileSync(path.join(process.cwd(),'dist',this.options.filename),$.html())
    })
  }
}

module.exports = HelloWorldPlugin