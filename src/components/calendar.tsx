import * as React from "react"
import { useState } from "react"
import { DateTime, IANAZone } from "luxon"

import { Schedule } from "../types"
import { arrayTo } from "./functions"
import CalendarMonth from "./calendarMonth"
import CalendarSheet from "./calendarSheet"

const style = require("./calendar.module.css")

interface CalendarProperties {
	timeZone: IANAZone
	schedule: Schedule
}

const Calendar = ({ timeZone, schedule }: CalendarProperties) => {
	const today: DateTime = DateTime.now().setZone(timeZone)
	const [month, setMonth] = useState(today.month)

	const firstDay: DateTime = today.set({ month }).startOf("month")
	const daysInMonth: number = firstDay.daysInMonth
	return (
		<>
			<div className={style.month}>
				<CalendarMonth month={month} months={schedule.months()} setMonth={setMonth} />
			</div>
			<div
				className={style.calendar}
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
		</>
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
