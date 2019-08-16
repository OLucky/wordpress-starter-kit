const path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';

module.exports = {
  mode: 'development',
  output: {
    filename: `./js/[name]${!isModern ? '.legacy' : ''}.dev.js`
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns:[path.join(process.cwd(), '../emitted-assets')], dry: false, dangerouslyAllowCleanPatternsOutsideProject: true}),
    new LiveReloadPlugin({
      delay: 100,
      appendScriptTag: true
    })
  ]
};