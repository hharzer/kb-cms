import React from "react"
import { NextPageContext } from "next"
import ErrorComponent, { ErrorProps } from "next/error"
import * as Honeybadger from "honeybadger"

export interface ErrorPageProps extends ErrorProps {
	hasGetInitialPropsRun?: boolean
	statusCode: number
	err?: Error
}

const ErrorPage = ({
	statusCode,
	hasGetInitialPropsRun,
	err,
}: ErrorPageProps) => {
	if (!hasGetInitialPropsRun && err) {
		// getInitialProps is not called in case of
		// https://github.com/zeit/next.js/issues/8592. As a workaround, we pass
		// err via _app.js so it can be captured
		Honeybadger.notify(err)
	}

	return <ErrorComponent statusCode={statusCode} />
}

export const getInitialProps = async (props: NextPageContext) => {
	const { res, err, asPath } = props
	const errorInitialProps = await ErrorComponent.getInitialProps(props)
	const errorProps = { ...errorInitialProps, hasGetInitialPropsRun: true }
	if (res) {
		// Running on the server, the response object is available.
		//
		// Next.js will pass an err on the server if a page's `getInitialProps`
		// threw or returned a Promise that rejected

		if (res.statusCode === 404) {
			// Opinionated: do not record an exception in Honeybadger for 404
			return { statusCode: 404 }
		}

		if (err) {
			Honeybadger.notify(err)

			return errorInitialProps
		}
	} else {
		// Running on the client (browser).
		//
		// Next.js will provide an err if:
		//
		//  - a page's `getInitialProps` threw or returned a Promise that rejected
		//  - an exception was thrown somewhere in the React lifecycle (render,
		//    componentDidMount, etc) that was caught by Next.js's React Error
		//    Boundary. Read more about what types of exceptions are caught by Error
		//    Boundaries: https://reactjs.org/docs/error-boundaries.html
		if (err) {
			Honeybadger.notify(err)

			return errorProps
		}
	}

	Honeybadger.notify(
		new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
	)

	return errorProps
}

export default ErrorPage
