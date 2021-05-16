import * as React from "react"

const style = require("../components/header.module.css")

const Header = () => {
	return (
		<div>
			<h1 className={style.title}>Stream&lt;Java&gt;</h1>
			<p className={style.intro}>Find streamers who code Java live on Twitch or YouTube.</p>
		</div>
	)
}

export default Header
