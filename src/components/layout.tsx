import * as React from "react"

import "./global.css"
const style = require("./layout.module.css")

interface LayoutProperties {
	children: any
}

const Layout = ({ children }: LayoutProperties) => (
	<main className={style.main}>{children}</main>
)

export default Layout
