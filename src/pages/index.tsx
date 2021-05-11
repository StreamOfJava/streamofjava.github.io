import * as React from "react"
import { Link } from "gatsby"
import { IANAZone } from "luxon"

import Layout from "../components/layout"
import Calendar from "../components/calendar"

const layoutStyle = require("../components/layout.module.css")

const IndexPage = () => (
	<Layout>
		<Calendar className={layoutStyle.calendar} timeZone={IANAZone.create("UTC")} />
	</Layout>
)

export default IndexPage
