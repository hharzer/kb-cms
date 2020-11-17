import Head from "next/head"

import Navigation from "./Navigation"
import { BasicMetadataProps, default as BasicMeta } from "./meta/BasicMeta"
import * as $ from "ramda"

import { default as EmptySvg } from "../assets/empty.svg"

type DefaultProps = { children: React.ReactNode; meta: BasicMetadataProps }

export interface LayoutProps {
	children: React.ReactNode
	isFallback?: boolean
	meta?: BasicMetadataProps
}
export default function Layout(props: LayoutProps) {
	const { children, meta, isFallback = false } = props

	const renderMeta = $.and($.not(isFallback), $.isNil(meta))
	const renderFallback = $.or($.not(isFallback), $.isNil(meta))

	return (
		<div className="root">
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="apple-touch-icon" href="/logo_new_gbltfb.png" />
				<meta name="theme-color" content="#fff" />
				{renderMeta && <BasicMeta {...meta} />}
			</Head>
			<nav>
				<Navigation />
			</nav>
			<main>{renderFallback ? <EmptySvg /> : children}</main>
			<style jsx>
				{`
					.root {
						display: block;
						padding: 4rem 0;
						box-sizing: border-box;
						height: 100%;
					}
					main {
						display: flex;
						min-height: 100%;
					}
					@media (min-width: 769px) {
						.root {
							display: flex;
							flex: 1 0 auto;
						}
						main {
							flex: 1 0 auto;
						}
					}
				`}
			</style>
		</div>
	)
}
