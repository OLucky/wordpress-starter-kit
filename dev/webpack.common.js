const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    app: [`./js/tools/polyfills.${process.env.BROWSERSLIST_ENV}.js`, './js/index.js']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      minChunks: 1
    }
  },
  output: {
    path: path.resolve(__dirname, '../emitted-assets/js')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '.')],
        exclude: /node_modules/
      },
      {
        test: /\.scss|css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: [/\.(ttf|eot|woff|woff2|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, /\.(jpe?g|png|gif)$/i],
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, './'),
              name: '../[path][name].[ext]',
              publicPath: '../emitted-assets'
            }
          }
        ]
      }
    ]
  }
};
