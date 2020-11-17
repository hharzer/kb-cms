import "normalize.css"
import { AppProps } from "next/app"
import Honeybadger from "honeybadger"

// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css"

/* if (typeof window === "undefined" || !window) {
	// Node
	// https://docs.honeybadger.io/lib/node.html#configuration
	Honeybadger.configure({
		apiKey: process.env.HONEYBADGER_API_KEY,
		developmentEnvironments: ["test", "development"],
	})
} else {
	// Browser
	// https://docs.honeybadger.io/lib/javascript/reference/configuration.html
	Honeybadger.configure({
		apiKey: process.env.HONEYBADGER_API_KEY,
		// @ts-ignore
		revision: process.env.HONEYBADGER_REVISION,
		disabled: process.env.NODE_ENV !== "production",
	})
	// This is handy for testing; remove it in production.

	window.Honeybadger = Honeybadger
} */

export default function App(props: AppProps) {
	const { Component, pageProps } = props
	// @ts-ignore
	const { err } = props
	const modifiedPageProps = { ...pageProps, err }
	return <Component {...modifiedPageProps} />
}
