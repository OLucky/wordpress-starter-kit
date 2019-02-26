const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  mode: "development",
  watch: true,
  devtool: "source-map",
  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true,
      delay: 100
    })
  ]
};