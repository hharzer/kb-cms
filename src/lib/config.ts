import config from "../../config.json"

export interface Config {
	base_url?: string
	site_title?: string
	logo_url?: string
	$schema?: string
	site_description?: string
	site_keywords?: SiteKeyword[]
	posts_per_page?: number
	snippets_per_page: number
	twitter_account?: string
	github_account?: string
	media_library?: MediaLibrary
}

export interface MediaLibrary {
	name?: string
	config?: ConfigClass
}

export interface ConfigClass {
	cloud_name?: string
	api_key?: string
}

export interface SiteKeyword {
	keyword?: string
}

export default config as Config
