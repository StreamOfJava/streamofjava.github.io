import * as React from "react"

import { FontAwesomeIcon, Location, Platform } from "../types"
import FaIcon from "./faIcon"

const style = require("./location.module.css")

interface LocationViewProperties {
	location: Location
}

const LocationView = ({ location }: LocationViewProperties) => {
	const platformStyle = style[Platform[location.platform].toLowerCase()]
	const classes: string = [style.badge, platformStyle].join(` `)
	return (
		<a className={classes} href={location.url.toString()}>
			<FaIcon icon={iconForPlatform(location.platform)} />
		</a>
	)
}

const iconForPlatform = (platform: Platform): FontAwesomeIcon => {
	switch (platform) {
		case Platform.Twitch:
			return FontAwesomeIcon.Twitch
		case Platform.YouTube:
			return FontAwesomeIcon.YouTube
	}
}

export default LocationView
