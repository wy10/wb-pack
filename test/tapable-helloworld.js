const { SyncHook } = require('tapable')
// 利用生命周期在某个阶段插入我们自己的代码
class Frontend {
  constructor() {
    this.hooks = {
      beforeStudy: new SyncHook(),
      afterHtml: new SyncHook(),
      afterCss: new SyncHook(),
      afterJs: new SyncHook(),
    }
  }
  study() {
    console.log("开班啦")
    this.hooks.beforeStudy.call()
    console.log("开始学习html")
    this.hooks.afterHtml.call()
    console.log("开始学习css")
    this.hooks.afterCss.call()
    console.log("开始学习js")
    this.hooks.afterJs.call()
  }
}

let f = new Frontend()
f.hooks.afterHtml.tap('afterHtml',()=>{
  console.log('学习完html之后我想写一个淘宝页面')
})
f.hooks.afterJs.tap('afterHtml',()=>{
  console.log('我完成所有的课程啦')
})
f.study()