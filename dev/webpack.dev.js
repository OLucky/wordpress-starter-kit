const LiveReloadPlugin = require('webpack-livereload-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';

module.exports = {
  mode: 'development',
  output: {
    filename: `[name]${!isModern ? '.legacy' : ''}.dev.js`
  },
  watch: true,
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(['../emitted-assets'], {allowExternal: true}),
    new MiniCssExtractPlugin({
      filename: `../css/[name]${!isModern ? '.legacy' : ''}.dev.css`
    }),
    new LiveReloadPlugin({
      appendScriptTag: true,
      delay: 100
    })
  ]
};
