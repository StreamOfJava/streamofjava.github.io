import * as React from "react"
import { DateTime, IANAZone } from "luxon"

import { Schedule } from "../types"
import { arrayTo } from "./functions"
import CalendarSheet from "./calendarSheet"

const style = require("./calendar.module.css")

interface CalendarProperties {
	className: string
	timeZone: IANAZone
	schedule: Schedule
}

const Calendar = ({ className, timeZone, schedule }: CalendarProperties) => {
	const today: DateTime = DateTime.now().setZone(timeZone)
	const firstDay: DateTime = today.startOf("month")
	const daysInMonth: number = firstDay.daysInMonth
	return (
		<div
			className={style.container + " " + className}
			style={{ gridTemplateAreas: gridStyle(firstDay, daysInMonth) }}
		>
			{arrayTo(daysInMonth)
				.map(index => index + 1)
				.map(dayOfMonth => {
					const day: DateTime = firstDay.set({ day: dayOfMonth })
					return (
						<CalendarSheet
							key={dayOfMonth}
							day={day}
							streams={schedule.streamsOn(day)}
							gridArea={`d${dayOfMonth}`}
						/>
					)
				})}
		</div>
	)
}

const gridStyle = (firstDay: DateTime, daysInMonth: number): string => {
	const offsetInDays = firstDay.weekday - 1
	const numberOfWeeks = Math.ceil((daysInMonth + offsetInDays) / 7)

	const weeks: string[] = arrayTo(numberOfWeeks).map(week =>
		arrayTo(7)
			.map(dayOfWeek => week * 7 + dayOfWeek)
			.map(index => index - offsetInDays + 1)
			.map(day => (1 <= day && day <= daysInMonth ? `d${day}` : `.`))
			.join(` `)
	)
	return `'${weeks.join(`' '`)}'`
}

export default Calendar
