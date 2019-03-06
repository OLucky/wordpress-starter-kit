const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';

module.exports = {
  mode: 'production',
  output: {
    filename: `[name]${!isModern ? '.legacy' : ''}.[contenthash].min.js`,
    publicPath: ''
  },
  plugins: [
    new CleanWebpackPlugin(['../emitted-assets'], {dry: !isModern, allowExternal: true}),
    new MiniCssExtractPlugin({
      filename: `../css/[name]${!isModern ? '.legacy' : ''}.[contenthash].min.css`
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE_BUNDLE ? 'server' : 'disabled',
      analyzerPort: process.env.BROWSERSLIST_ENV === 'modern' ? 9000 : 9001
    })
  ]
};
