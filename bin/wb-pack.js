#!/usr/bin/env node

// 1.读取配置文件
const path = require("path")
// 如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录
const config = require(path.resolve('webpack.config.js'))
// 2.通过面向对象的方式来进行项目推进
const Compiler = require("../lib/Compiler")
new Compiler(config).start()