import * as React from "react"

import { Location } from "../types"

const style = require("./locationBadge.module.css")

interface LocationProperties {
	location: Location
}

const LocationBadge = ({ location }: LocationProperties) => {
	return (
		<a href={location.url.toString()}>!</a>
	)
}

export default LocationBadge
