import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";

const IndexPage = () => (
	<Layout>
		<h1>Welcome to Stream&lt;Java&gt;</h1>

		<p>On this page, we'll create a calendar that shows who live-streams Java at what times.</p>

		<h2>Who’s that?</h2>

		<ul>
			<li>Ted M. Young (JitterTed): <Link to={"https://www.twitch.tv/jitterted"}>Twitch</Link> - <Link to={"https://twitter.com/jitterted"}>Twitter</Link></li>
			<li>Nicolai Parlog (nipafx): <Link to={"https://www.twitch.tv/nipafx"}>Twitch</Link> - <Link to={"https://twitter.com/nipafx"}>Twitter</Link></li>
			<li>Kevin Wittek (Kiview): <Link to={"https://www.twitch.tv/kiview"}>Twitch</Link> - <Link to={"https://twitter.com/kiview"}>Twitter</Link></li>
			<li>Matthew Gilliard: <Link to={"https://www.twitch.tv/MaximumGilliard"}>Twitch</Link> - <Link to={"https://twitter.com/MaximumGilliard"}>Twitter</Link></li>
			<li>Tim Zöller: <Link to={"https://www.twitch.tv/JavaHippie"}>Twitch</Link> - <Link to={"https://twitter.com/JavaHippie"}>Twitter</Link></li>
		</ul>

		<h2>What’s going on?</h2>

		<p>We’ll put details of upcoming streams and events here once we’ve automated it.</p>
	</Layout>
)

export default IndexPage
