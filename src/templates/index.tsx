import * as React from "react"
import { graphql } from "gatsby"
import { DateTime, IANAZone } from "luxon"

import { Stream, Schedule, Location, Platform, Streamer } from "../types"
import Layout from "../components/layout"
import Streamers from "../components/streamers"
import Calendar from "../components/calendar"

const layoutStyle = require("../components/layout.module.css")

interface IndexProperties {
	data: any
}

const IndexPage = ({ data }: IndexProperties) => {
	return (
		<Layout>
			<Streamers streamers={readStreamers(data.streamers.nodes)} />
			<Calendar
				className={layoutStyle.calendar}
				timeZone={IANAZone.create("UTC")}
				schedule={readSchedule(data.streamers.nodes)}
			/>
		</Layout>
	)
}

const readStreamers = (streamers: any): Streamer[] => {
	return streamers.map(readStreamer)
}

const readStreamer = (streamer: any): Streamer => {
	const channels: Location[] = []
	if (streamer.twitch_handle)
		channels.push({
			platform: Platform.Twitch,
			url: new URL(`https://twitc.tv/${streamer.twitch_handle}`),
		})
	if (streamer.youtube_url)
		channels.push({
			platform: Platform.YouTube,
			url: new URL(streamer.youtube_url),
		})
	return {
		name: streamer.name,
		color: streamer.color,
		channels,
	}
}

const readSchedule = (streamers: any): Schedule => {
	const streams: Stream[] = streamers.flatMap((streamer: any) =>
		streamer.schedule.map((stream: any) => readStream(streamer, stream))
	)
	streams.sort(
		(left: Stream, right: Stream) => left.startTime.toMillis() - right.startTime.toMillis()
	)
	return new ArraySchedule(streams)
}

const readStream = (streamer: any, stream: any): Stream => ({
	title: stream.title,
	startTime: DateTime.fromISO(stream.start_time),
	locations: stream.stream_links.map((streamLink: any) => readLocation(streamer, streamLink)),
	color: streamer.color,
})

const readLocation = (streamer: any, streamLink: any): Location => {
	switch (streamLink.platform) {
		case `twitch`:
			return {
				platform: Platform.Twitch,
				url: new URL(streamLink.url ?? `https://twitch.tv/${streamer.twitch_handle}`),
			}
		case `youtube`:
			return {
				platform: Platform.YouTube,
				url: new URL(streamLink.url ?? streamer.youtube_url),
			}
	}
	throw new Error(`Unknown streaming platform "${streamLink.platform}"`)
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
