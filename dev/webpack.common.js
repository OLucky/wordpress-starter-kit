const path = require('path');

module.exports = {
  context: path.resolve(__dirname, '.'),
  entry: {
    app: [`./ts/tools/polyfills.${process.env.BROWSERSLIST_ENV}.ts`, './ts/index.ts']
  },
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      minChunks: 1
    }
  },
  output: {
    path: path.resolve(__dirname, '../emitted-assets')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.js|ts$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, '.')],
        exclude: /node_modules/
      },
      {
        test: [/\.(ttf|eot|woff|woff2|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, /\.(jpe?g|png|gif)$/i],
        use: [
          {
            loader: 'file-loader',
            options: {
              context: path.resolve(__dirname, './'),
              name: '[path][name].[ext]',
              publicPath: '/wp-content/themes/reinvently/emitted-assets/'
            }
          }
        ]
      }
    ]
  }
};
