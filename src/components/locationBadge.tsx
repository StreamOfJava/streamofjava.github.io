import * as React from "react"

import { FontAwesomeIcon, Location, Platform } from "../types"
import FaIcon from "./faIcon"

const style = require("./locationBadge.module.css")

interface LocationProperties {
	location: Location
}

const LocationBadge = ({ location }: LocationProperties) => {
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

export default LocationBadge
