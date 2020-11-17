const withSourceMaps = require("@zeit/next-source-maps")
const HoneybadgerSourceMapPlugin = require("@honeybadger-io/webpack")
const { execSync } = require("child_process")

const { HONEYBADGER_API_KEY, NODE_ENV } = process.env
const HONEYBADGER_REVISION = execSync("git rev-parse HEAD").toString().trim()
/* withMdxEnhanced({
	layoutPath: "src/layouts",
	defaultLayout: true,
	rehypePlugins: [rehypePrism],
}) */

module.exports = {
	env: {
		HONEYBADGER_API_KEY: HONEYBADGER_API_KEY,
		HONEYBADGER_REVISION: HONEYBADGER_REVISION,
	},
	webpack: (config, options) => {
		/* 		if (!options.isServer) {
			config.resolve.alias["honeybadger"] = "honeybadger-js"
		}
		if (HONEYBADGER_API_KEY && NODE_ENV === "production") {
			config.plugins.push(
				new HoneybadgerSourceMapPlugin({
					apiKey: HONEYBADGER_API_KEY,
					revision: HONEYBADGER_REVISION,
				})
			)
		} */
		config.module.rules.push(
			...[
				{
					test: /\.yml$/,
					type: "json",
					use: "yaml-loader",
				},
				{
					test: /\.svg$/,
					use: "@svgr/webpack",
				},
			]
		)
		return config
	},
}
