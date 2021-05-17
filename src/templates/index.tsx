import * as React from "react"
import { graphql } from "gatsby"
import { DateTime, IANAZone, Zone } from "luxon"

import { Stream, Schedule, Location, Platform, Streamer } from "../types"
import Layout from "../components/layout"
import Header from "../components/header"
import Calendar from "../components/calendar"
import Streamers from "../components/streamers"

const layout = require("../components/layout.module.css")

interface IndexProperties {
	data: any
}

const IndexPage = ({ data }: IndexProperties) => {
	return (
		<Layout>
			<div className={layout.header}>
				<Header />
			</div>
			<div className={layout.calendar}>
				<Calendar schedule={readSchedule(data.streamers.nodes)} />
			</div>
			<div className={layout.streamers}>
				<Streamers streamers={readStreamers(data.streamers.nodes)} />
			</div>
		</Layout>
	)
}

const readStreamers = (streamers: any): Streamer[] => {
	const parsed: Streamer[] = streamers.map(readStreamer)
	parsed.sort((left, right) => left.name.localeCompare(right.name))
	return parsed
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
	startTime: DateTime.fromISO(stream.start_time).toUTC(),
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
	_months: number[]
	_streams: Stream[]

	constructor(streams: Stream[]) {
		this._streams = streams
		const monthsWithDuplicates: number[] = streams.map(stream => stream.startTime.month)
		this._months = [...new Set(monthsWithDuplicates)]
	}

	streamsOn(day: DateTime): Stream[] {
		const timeZone: Zone = day.zone
		return this._streams.filter(stream =>
			stream.startTime.setZone(timeZone).hasSame(day, `day`)
		)
	}

	months(): number[] {
		return this._months.slice()
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
