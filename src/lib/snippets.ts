import fs from "fs"
import matter from "gray-matter"
import path from "path"
import yaml from "js-yaml"
import logger from "signale"
import _ from "lodash"

const SnippetDirectory = path.join(process.cwd(), "cms/snippets")

export type SnippetContent = {
	readonly date: string
	readonly title: string
	readonly slug: string
	readonly tags?: string[]
	readonly source: string[]
	readonly author: string
	readonly comment: string
}

let postCache: SnippetContent[]

function fetchSnippetContent(): SnippetContent[] {
	try {
		if (postCache) {
			return postCache
		}
		// Get file names under /posts
		const fileNames = fs.readdirSync(SnippetDirectory)
		const allPostsData = fileNames
			.filter((it) => it.endsWith(".mdx"))
			.map((fileName) => {
				// Read markdown file as string
				const fullPath = path.join(SnippetDirectory, fileName)
				const fileContents = fs.readFileSync(fullPath, "utf8")

				// Use gray-matter to parse the post metadata section
				const matterResult = matter(
					fileContents /* , {
          engines: {
            yaml: (s) => yaml.safeLoad(s, { schema: yaml.JSON_SCHEMA }) as object,
          },
        } */
				)

				const matterData = matterResult.data as {
					date: Date
					title: string
					slug: string
					tags?: string[]
					source: string[]
					author: string
					comment: string
				}

				const slug = fileName

				// Validate slug string
				if (matterData.slug !== slug) {
					throw new Error(
						"slug field not match with the path of its content source"
					)
				}

				const plainData = { ...matterData, date: matterData.date.toISOString() }
				return plainData
			})
		// Sort posts by date
		postCache = allPostsData.sort((a, b) => {
			if (a.date < b.date) {
				return 1
			} else {
				return -1
			}
		})
		return postCache
	} catch (err) {
		return []
	}
}

export function countSnippets(tag?: string): number {
	try {
		return fetchSnippetContent().filter(
			(it) => !tag || (it.tags && it.tags.includes(tag))
		).length
	} catch (err) {
		return 0
	}
}

export function listSnippetContent(
	page: number,
	limit: number,
	tag?: string
): SnippetContent[] {
	return page > 0
		? fetchSnippetContent()
				.filter((it) => !tag || (it.tags && it.tags.includes(tag)))
				.slice((page - 1) * limit, page * limit)
		: []
}
