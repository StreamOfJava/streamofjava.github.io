import * as React from "react"
import { RefObject, useEffect, useRef, useState } from "react"
import { DateTime, IANAZone, Zone } from "luxon"
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb"

const style = require("./timeZones.module.css")

interface TimeZonesProperties {
	timeZone: IANAZone
	setTimeZone: any
}

const TimeZones = ({ timeZone, setTimeZone }: TimeZonesProperties) => {
	const [change, setChange]: [boolean, any] = useState(false)
	const timeZoneRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
	useEffect(() => timeZoneRef.current?.scrollIntoView())

	const tzName: string = timeZone.name
	const time: string = DateTime.now().setZone(timeZone).toFormat(`HH:mm`)

	const changeClassName: string = change ? style.changing : style.change

	return (
		<div className={style.container}>
			<span className={style.text}>
				{`Days and times in ${tzName}, where it's currently ${time}.`}
				<span> </span>
				<span className={changeClassName} onClick={() => setChange(!change)}>
					Change.
				</span>
			</span>
			{change ? pickTimeZone(tzName, timeZoneRef, setTimeZone, setChange) : null}
		</div>
	)
}

const pickTimeZone = (
	tzName: string,
	timeZoneRef: RefObject<HTMLDivElement>,
	setTimeZone: any,
	setChange: any
) => {
	const select = (tz: string) => () => {
		setTimeZone(IANAZone.create(tz))
		setChange(false)
	}
	return (
		<div className={style.list}>
			{getTimeZones().map(tz => {
				const currentTz: boolean = tzName === tz.name
				const className = currentTz ? style.current : style.element
				const ref = currentTz ? timeZoneRef : null
				return (
					<>
						<div className={className} onClick={select(tz.name)} ref={ref}>
							{tz.currentTimeFormat}
						</div>
						<div className={style.divider} />
					</>
				)
			})}
		</div>
	)
}

export default TimeZones
