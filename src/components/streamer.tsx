import * as React from "react"

import { Streamer } from "../types"
import LocationView from "./location"

const style = require("./streamer.module.css")

interface StreamerViewProperties {
	streamer: Streamer
}

const StreamerView = ({ streamer }: StreamerViewProperties) => {
	const streamerStyle: any = {}
	streamerStyle[`--streamer-color`] = streamer.color
	return (
		<span className={style.streamer} style={streamerStyle}>
			<span className={style.name}>{streamer.name}</span>
			<span className={style.divider} />
			<span className={style.channels}>{streamer.channels.map(channel => <LocationView location={channel} />)}</span>
		</span>
	)
}

export default StreamerView
