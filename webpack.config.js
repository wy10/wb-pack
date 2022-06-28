const path = require('path')
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
  }
}