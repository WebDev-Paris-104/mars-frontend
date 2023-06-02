import "./Caption.css"

import { useContext, useMemo } from "react"
import captions from "./captions.json"
import { ThemeContext } from "../contexts/ThemeContext"

const { messages } = captions

const Caption = ({ date, sol, rover }) => {
	const { theme } = useContext(ThemeContext)

	const message = useMemo(
		() => messages[Math.floor(Math.random() * messages.length)],
		[]
	)

	return (
		<div className="caption">
			<p className="date">
				{JSON.stringify(date, null, 2)} (Sol {sol})
			</p>
			<p>
				<span className="author">{rover.name.toLowerCase()}</span> {message}
			</p>
			<p>The theme is {theme}!</p>
		</div>
	)
}

export default Caption
