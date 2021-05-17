const { DateTime, Duration } = require("luxon")
const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions
	const typeDefs = `
		type StreamsJson implements Node @dontInfer {
			name: String!
			color: String!
			twitch_handle: String
			youtube_url: String
			schedule: [Stream!]
		}
		type Stream {
			title: String!
			description: String
			start_time: Date!
			start_time_ms: Int
			duration_in_minutes: Int
			stream_links: [StreamLink!]
		}
		type StreamLink {
			platform: String!
			url: String
		}
	`
	createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions

	const firstMonth = DateTime.now()
		.toUTC()
		.minus(Duration.fromObject({ weeks: 4 }))
		.startOf("month")
	const indexTemplate = path.resolve(`./src/templates/index.tsx`)

	return graphql(`
		{
			streamers: allStreamsJson {
				nodes {
					twitch_handle
					name
					schedule {
						description
						duration_in_minutes
						title
						stream_links {
							platform
							url
						}
						start_time
					}
					youtube_url
					color
				}
			}
		}
	`).then(({ data }) => {
		// filter data here (i.e. at build-time) to prevent shipping outdated stream schedules
		// to website visitors
		const streamers = data.streamers.nodes
			.map(streamer => ({
				...streamer,
				schedule: streamer.schedule.filter(
					stream => DateTime.fromISO(stream.start_time) > firstMonth
				),
			}))
			.filter(streamer => streamer.schedule.length > 0)

		createPage({
			path: `/`,
			component: indexTemplate,
			context: { streamers },
		})
	})
}
