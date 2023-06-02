import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeContextWrapper } from "./contexts/ThemeContext"
import { AuthContextWrapper } from "./contexts/AuthContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	// <React.StrictMode>
	<Router>
		<ThemeContextWrapper>
			<AuthContextWrapper>
				<App />
			</AuthContextWrapper>
		</ThemeContextWrapper>
	</Router>
	// </React.StrictMode>
)
