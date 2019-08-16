const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isModern = process.env.BROWSERSLIST_ENV === 'modern';

module.exports = {
  mode: 'production',
  output: {
    filename: `./js/[name]${isModern ? '.modern' : '.legacy'}.min.js`,
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns:[path.join(process.cwd(), '../emitted-assets')], dangerouslyAllowCleanPatternsOutsideProject: true, dry: !isModern, verbose: false}),
    new MiniCssExtractPlugin({
      filename: `./css/[name]${isModern ? '.modern' : '.legacy'}.min.css`
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE_BUNDLE ? 'server' : 'disabled',
      analyzerPort: process.env.BROWSERSLIST_ENV === 'modern' ? 9000 : 9001
    })
  ]
};
