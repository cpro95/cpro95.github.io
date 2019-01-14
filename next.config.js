module.exports = {
	webpack: (config) => {
		config.module.rules.push(
		  {
			test: /\.md$/,
			use: 'raw-loader'
		  }
		)
	
		return config
	  },
	exportPathMap: function() {
		return {
			'/': { page: '/' },
			'/blogs': { page: '/blogs' },
			'/family': { page: '/family' },
			'/about': { page: '/about' }
		}
	}
}
