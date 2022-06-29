const path = require('path')
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname,'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.js/, 
        use: {
          loader: './loader/loader1.js',
          options: {
            name: '大大后天',
          }
        },
        enforce:'pre'
      },
      { 
        test: /\.js/, 
        use: './loader/loader2.js',
      }
    ],
  },
  plugins:[
    new HelloWorldPlugin({
      filename:'index.html',
      template:'./src/index.html'
    })
  ]
}