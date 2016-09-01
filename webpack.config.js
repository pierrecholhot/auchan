var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    alias: {
      "@actions": path.resolve(__dirname, 'app/actions'),
      "@components": path.resolve(__dirname, 'app/components'),
      "@containers": path.resolve(__dirname, 'app/containers'),
      "@helpers": path.resolve(__dirname, 'app/helpers'),
      "@reducers": path.resolve(__dirname, 'app/reducers'),
      "@store": path.resolve(__dirname, 'app/store'),
      "@ui": path.resolve(__dirname, 'app/ui'),
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
