const { DateTime } = require("luxon")
const path = require(`path`)

exports.createPages = ({ actions }) => {
	const { createPage } = actions

	const beginningOfMonth = DateTime.now()
		.startOf('month')
		.toJSDate()
	const indexTemplate = path.resolve(`./src/templates/index.tsx`)
	createPage({
		path: `/`,
		component: indexTemplate,
		context: { beginningOfMonth },
	})
}
