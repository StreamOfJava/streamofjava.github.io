import * as React from "react"
import { graphql } from "gatsby"
import { DateTime, IANAZone } from "luxon"

import { Stream, Schedule } from "../types"
import Layout from "../components/layout"
import Calendar from "../components/calendar"

const layoutStyle = require("../components/layout.module.css")

interface IndexProperties {
	data: any
}

const IndexPage = ({ data }: IndexProperties) => {
	return (
		<Layout>
			<Calendar
				className={layoutStyle.calendar}
				timeZone={IANAZone.create("UTC")}
				schedule={readSchedule(data.streamers.nodes)}
			/>
		</Layout>
	)
}

const readSchedule = (streamerData: any): Schedule => {
	const streams: Stream[] = streamerData
		.flatMap((streamer: any) => streamer.schedule)
		.map((stream: any) => ({ startTime: DateTime.fromISO(stream.start_time) } as Stream))
	streams.sort((left: Stream, right: Stream) => left.startTime.toMillis() - right.startTime.toMillis())
	return new ArraySchedule(streams)
}

class ArraySchedule implements Schedule {
	streams: Stream[]

	constructor(streams: Stream[]) {
		this.streams = streams
	}

	streamsOn(day: DateTime): Stream[] {
		return this.streams.filter(stream => stream.startTime.hasSame(day, `day`))
	}
}

export default IndexPage

// TODO using $beginningOfMonth leads to empty result even if there are streams in the future - weird
export const query = graphql`
	query StreamerQuery {
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
`
