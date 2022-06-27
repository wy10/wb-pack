#!/usr/bin/env node

// 1.读取配置文件
const path = require("path")
const config = require(path.resolve('webpack.config.js'))
// 2.通过面向对象的方式来进行项目推进
const Compiler = require("../lib/Compiler")
new Compiler(config).start()