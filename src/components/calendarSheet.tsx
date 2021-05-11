import * as React from "react"
import { DateTime } from "luxon"

import { ordinalDay } from "./functions"

const style = require("./calendarSheet.module.css")

interface SheetProperties {
	day: DateTime
	gridArea: string
}

const CalendarSheet = ({ day, gridArea }: SheetProperties) => {
	return (
		<div className={style.container} style={{ gridArea }}>
			<div className={style.header}>
				<span className={style.weekday}>{day.toFormat("EEE")}</span>
				<span className={style.day}>{ordinalDay(day.day)}</span>
			</div>
			<div className={style.body}></div>
		</div>
	)
}

export default CalendarSheet
