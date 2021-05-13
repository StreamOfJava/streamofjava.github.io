import * as React from "react"

import { Stream } from "../types"
import LocationBadge from "./locationBadge"

const style = require("./calendarEntry.module.css")

interface EntryProperties {
	stream: Stream
}

const CalendarEntry = ({ stream }: EntryProperties) => {
	const entryStyle: any = {}
	entryStyle[`--streamer-color`] = stream.color
	return (
		<div className={style.entry} style={entryStyle}>
			<span className={style.time}>{stream.startTime.toFormat("HH:mm")}</span>
			<span className={style.title}>{stream.title}</span>
			<span className={style.locations}>
				{stream.locations.map(location => (
					<LocationBadge key={location.url.toString()} location={location} />
				))}
			</span>
		</div>
	)
}

export default CalendarEntry
