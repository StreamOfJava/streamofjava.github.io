import * as React from "react"
import { DateTime } from "luxon"

import { ordinalDay } from "./functions"
import { Stream } from "../types"

const style = require("./calendarSheet.module.css")

interface SheetProperties {
	day: DateTime
	streams: Stream[]
	gridArea: string
}

const CalendarSheet = ({ day, streams, gridArea }: SheetProperties) => {
	return (
		<div className={style.container} style={{ gridArea }}>
			<div className={style.header}>
				<span className={style.weekday}>{day.toFormat("EEE")}</span>
				<span className={style.day}>{ordinalDay(day.day)}</span>
			</div>
			<div className={style.body}>
				{streams.map(displayStream)}
			</div>
		</div>
	)
}

const displayStream = (stream: Stream) => {
	// TODO display something useful
	return <span key={stream.startTime.toMillis()}>stream</span>
}

export default CalendarSheet
