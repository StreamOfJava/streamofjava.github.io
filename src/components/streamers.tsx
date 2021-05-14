import * as React from "react"

import { Streamer } from "../types"
import StreamerView from "./streamer"

const style = require("./streamers.module.css")

interface StreamersProperties {
	streamers: Streamer[]
}

const Streamers = ({ streamers }: StreamersProperties) => (
	<div className={style.container}>
		{streamers.map(streamer => (
			<StreamerView key={streamer.name} streamer={streamer} />
		))}
	</div>
)

export default Streamers
