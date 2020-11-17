import HoneyBadger from "honeybadger"
import HoneyBadgerJS from "honeybadger-js"
declare global {
	interface Window {
		Honeybadger?: HoneyBadger | HoneyBadgerJS
	}
	declare module "*.svg" {
		import * as React from "react"
		export const ReactComponent: React.FunctionComponent<React.SVGProps<
			SVGSVGElement
		>>

		export default ReactComponent
	}

	declare module "*.json" {
		const value: any
		export default value
	}

	declare module "*.yml" {
		const value: any
		export default value
	}
}

export interface NextConig {
	env?: { [key: string]: string | boolean | number }[]
	webpack?: Function
	webpackDevMiddleware?: Function | Function[]
	distDir?: string
	assetPrefix?: string
	configOrigin?: string
	useFileSystemPublicRoutes?: boolean
	generateEtags?: boolean
	pageExtensions?: string[]
	target?: string
	poweredByHeader?: boolean
	compress?: boolean
	devIndicators?: DevIndicators
	onDemandEntries?: OnDemandEntries
	amp?: Amp
	exportTrailingSlash?: boolean
	experimental?: Experimental
	future?: Future
	serverRuntimeConfig?: ServerRuntimeConfig
	publicRuntimeConfig?: PublicRuntimeConfig
	reactStrictMode?: boolean
}

export interface DevIndicators {
	buildActivity?: boolean
	autoPrerender?: boolean
}

export interface OnDemandEntries {
	maxInactiveAge?: number
	pagesBufferLength?: number
}

export interface Amp {
	canonicalBase?: string
}

export interface Experimental {
	cpus?: number
	jsconfigPaths?: boolean
	css?: boolean
	scss?: boolean
	documentMiddleware?: boolean
	granularChunks?: boolean
	modern?: boolean
	plugins?: boolean
	profiling?: boolean
	sprFlushToDisk?: boolean
	reactMode?: string
	workerThreads?: boolean
	basePath?: string
	sassOptions?: SassOptions
	pageEnv?: boolean
}

export interface SassOptions {}

export interface Future {
	excludeDefaultMomentLocales?: boolean
}

export interface ServerRuntimeConfig {}

export interface PublicRuntimeConfig {}
