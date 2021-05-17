import { IANAZone } from "luxon"
import * as React from "react"

import { Stream } from "../types"
import LocationView from "./location"

const style = require("./calendarEntry.module.css")

interface EntryProperties {
	stream: Stream
	timeZone: IANAZone
}

const CalendarEntry = ({ stream, timeZone }: EntryProperties) => {
	const entryStyle: any = {}
	entryStyle[`--streamer-color`] = stream.color
	return (
		<div className={style.entry} style={entryStyle}>
			<span className={style.time}>
				{stream.startTime.setZone(timeZone).toFormat("HH:mm")}
			</span>
			<span className={style.locations}>
				{stream.locations.map(location => (
					<LocationView key={location.url.toString()} location={location} />
				))}
			</span>
			<span className={style.title}>{stream.title}</span>
		</div>
	)
}

export default CalendarEntry
