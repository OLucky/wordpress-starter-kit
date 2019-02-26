const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	mode: "production",
	optimization: {
		splitChunks: {
			chunks: "all",
			name: "vendors",
			minChunks: 2
    }
	},
	output: {
		publicPath: "",
	},
	plugins: [
		new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE_BUNDLE ? "server" : "disabled",
      analyzerPort: 9000
    })
	]
};