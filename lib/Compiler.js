const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const ejs = require('ejs')

class Compiler {
  constructor(config) {
    this.config = config
    this.entry = config.entry
    // 执行命令项目的磁盘目录
    this.root = process.cwd()
    // 初始化一个空对象来存放所有模块
    this.modules = {}
  }
  start() {
    // 依赖的分析
    this.depAnalyes(path.resolve(this.root,this.entry))
    this.emitFile()
  }
  getSource(path) {
    return fs.readFileSync(path, 'utf-8')
  }
  depAnalyes(modulePath) {
    // 拿到对应模块的代码
    let source = this.getSource(modulePath)
    // 准备一个依赖数组,用于存储当前模块的所有依赖
    let dependencies = []
    // 将模块中的代码转成抽象语法树
    let ast = parser.parse(source)
    // 需要进一步处理比如将require替换成__webpack_require__,使用抽象语法树来进行替换
    traverse(ast,{
      CallExpression(p) {
        if(p.node.callee.name === 'require') {
          p.node.callee.name = '__webpack_require__'
          let oldValue = p.node.arguments[0].value 
          // 避免出现./src\news.js
          p.node.arguments[0].value = ('./' + path.join('src',oldValue)).replace(/\\+/g,'/')
          dependencies.push(p.node.arguments[0].value)
        }
      }
    })
    // 将ast转换成源码
    let sourceCode = generator(ast).code
    let modulePathRelative = './' + path.relative(this.root,modulePath).replace(/\\+/g,'/')
    this.modules[modulePathRelative] = sourceCode
    // 递归加载所有依赖
    dependencies.forEach(dep=>{
      this.depAnalyes(path.resolve(this.root,dep))
    })

  }
  emitFile() {
    let template = this.getSource(path.join(__dirname,'../template/output.ejs'))
    let result = ejs.render(template,{
      entry:this.entry,
      modules:this.modules
    })
    let outputPath = path.join(this.config.output.path,this.config.output.filename)
    fs.mkdirSync(this.config.output.path)
    fs.writeFileSync(outputPath,result)
  }
}

module.exports = Compiler

