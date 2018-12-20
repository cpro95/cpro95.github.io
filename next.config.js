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
			'/works': { page: '/works' },
			'/family': { page: '/family' },
			'/about': { page: '/about' }
		}
	}
}
