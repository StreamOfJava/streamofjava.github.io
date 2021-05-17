import * as React from "react"
import { DateTime, IANAZone } from "luxon"

import { ordinalDay } from "./functions"
import { Stream } from "../types"
import CalendarEntry from "./calendarEntry"

const style = require("./calendarSheet.module.css")

interface SheetProperties {
	day: DateTime
	timeZone: IANAZone
	streams: Stream[]
	gridArea: string
}

const CalendarSheet = ({ day, timeZone, streams, gridArea }: SheetProperties) => {
	return (
		<div className={style.container} style={{ gridArea }}>
			<div className={style.header}>
				<span className={style.weekday}>{day.toFormat("EEE")}</span>
				<span className={style.day}>{ordinalDay(day.day)}</span>
			</div>
			<div className={style.body}>
				{streams.map(stream => (
					<CalendarEntry
						key={stream.startTime.toISO()}
						stream={stream}
						timeZone={timeZone}
					/>
				))}
			</div>
		</div>
	)
}

export default CalendarSheet
