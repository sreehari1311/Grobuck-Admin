var path = require('path');
var webpack = require('webpack');
module.exports = {
  module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "components"),
          path.resolve(__dirname, "dispatcher"),
          path.resolve(__dirname, "actions"),
          path.resolve(__dirname, "stores"),
          path.resolve(__dirname, "store"),
          path.resolve(__dirname, "reducers"),
          path.resolve(__dirname, "constants"),
        ],
        test: /\.jsx?$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react','stage-0'],
        }
      },
      {test: /\.styl$/, loader: 'style!css!postcss!stylus'},
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.gif$/, loader: 'url-loader?mimetype=image/png'},
      {test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: 'file-loader?name=[name].[ext]'},
    ]
  },
  output: {
    filename: './public/javascripts/build/app.js'
  },
  entry: [
    './components/App.js'
  ],
  resolve: {
    extensions: ['', '.js','.jsx']
  },
  watch: true,
  colors: true,
  progress: true
};
