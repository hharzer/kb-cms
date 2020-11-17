const { execSync } = require("child_process")

/* withMdxEnhanced({
	layoutPath: "src/layouts",
	defaultLayout: true,
	rehypePlugins: [rehypePrism],
}) */

module.exports = {
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
