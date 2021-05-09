import * as React from "react"

import "./global.css"
const layoutStyle = require("./layout.module.css")

interface LayoutProperties {
    children: any
}

const Layout = ({ children }: LayoutProperties) => (
    <main className={layoutStyle.main}>
        {children}
    </main>
)

export default Layout
