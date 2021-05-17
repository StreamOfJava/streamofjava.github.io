import * as React from "react"
import { Info } from "luxon"

const style = require("./calendarMonth.module.css")

interface CalendarMonthProperties {
	month: number
	months: number[]
	setMonth: any
}

const CalendarMonth = ({ month, months, setMonth }: CalendarMonthProperties) => {
	const firstMonth = months.indexOf(month) === 0
	const lastMonth = months.indexOf(month) === months.length - 1
	return (
		<div className={style.container}>
			<button
				className={style.button}
				disabled={firstMonth}
				onClick={() => setMonth(month - 1)}
			>
				&lt;
			</button>
			<h2 className={style.shortMonth}>{Info.monthsFormat("short")[month - 1]}</h2>
			<h2 className={style.longMonth}>{Info.months()[month - 1]}</h2>
			<button
				className={style.button}
				disabled={lastMonth}
				onClick={() => setMonth(month + 1)}
			>
				&gt;
			</button>
		</div>
	)
}

export default CalendarMonth
