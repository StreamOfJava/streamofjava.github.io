module.exports = {
	siteMetadata: {
		title: `Stream<Java>`,
		description: `Making it easy to find Java devs who live stream their work.`,
		author: `Nicolai (nipafx)`,
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `streams`,
				path: `${__dirname}/streams`,
				ignore: [`**/*.schema.json`]
			},
		},
		`gatsby-transformer-json`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
		// pull in FontAwesome CSS during build
		// https://medium.com/@johnny02/how-to-add-font-awesome-to-a-gatsby-site-89da940924d5
		`gatsby-plugin-fontawesome-css`,
		`gatsby-plugin-react-helmet`,
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
