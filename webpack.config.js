module.exports = {
	devServer: {
		historyApiFallback: true
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		
		{
			test: /.(jpg|png)$/,
			use: ['url-loader']
		},
		{
			use: ['style-loader', 'css-loader'],
			test: /\.css$/
			}
		]

	}
}
