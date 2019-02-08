const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: path.resolve(__dirname, "."),
	entry: {
    app: "./js/index.js"
	},
	output: {
    filename: "[name].min.js",
		path: path.resolve(__dirname, "../js"),    
  },
  externals: {
    jquery: 'jQuery',
  },
	target: "web",
	module: {
		rules: [{
			test: /\.js$/,
			loader: "babel-loader",
			include: [path.resolve(__dirname, ".")],
			exclude: /node_modules/
		},
		{
			test: /\.scss|css$/,
			exclude: /node_modules/,
			use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
		},
		{
      test: [
             /\.(ttf|eot|woff|woff2|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
             /\.(jpe?g|png|gif)$/i
            ],
			use: [{
				loader: "file-loader",
				options: {
          emitFile: false,
          context: path.resolve(__dirname, "../"),
          name: '[path][name].[ext]',
          publicPath: "../"
				}
			}]
		}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
		}),
		new MiniCssExtractPlugin({
      filename: "../css/styles.min.css"
		})
	],
};