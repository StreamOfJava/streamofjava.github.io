module.exports = {
	siteMetadata: {
		title: `Stream<Java>`,
		description: `Making it easy to find Java devs who live stream their work.`,
		author: `Nicolai (nipafx)`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				title: `Stream<Java>`,
				start_url: `/`,
				background_color: `#FFFFFF`,
				theme_color: `#C72A4A`,
				display: `minimal-ui`,
				icon: `src/images/streamofjava.svg`,
			},
		},
	],
}
