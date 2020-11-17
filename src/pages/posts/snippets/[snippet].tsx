import { GetStaticPaths, GetStaticProps } from "next"
import Layout from "../../../components/Layout"
import SnippetList from "../../../components/SnippetList"
import config from "../../../lib/config"
import { useRouter } from "next/router"
import { default as EmptySvg } from "../../../assets/empty.svg"
import * as $ from "ramda"

import {
	countSnippets,
	listSnippetContent,
	SnippetContent,
} from "../../../lib/snippets"
import { listTags, TagContent } from "../../../lib/tags"

type Props = {
	Snippets: SnippetContent[]
	tags: TagContent[]
	page: number
	pagination: {
		current: number
		pages: number
	}
}
export default function Page({ Snippets, tags, pagination, page }: Props) {
	const url = `/snippets/page/${page}`
	const title = "All Snippets"
	const renderEmpty = $.or($.isEmpty(tags), $.isNil(tags))
	const router = useRouter()
	return (
		<Layout
			meta={{
				url,
				title,
			}}
			isFallback={router.isFallback}
		>
			{renderEmpty ? (
				<EmptySvg />
			) : (
				<SnippetList snippets={Snippets} tags={tags} pagination={pagination} />
			)}
		</Layout>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const page = parseInt(params.page as string)
	const Snippets = listSnippetContent(page, config.snippets_per_page)
	const tags = listTags()
	const pagination = {
		current: page,
		pages: Math.ceil(countSnippets() / config.snippets_per_page),
	}
	return {
		props: {
			page,
			Snippets,
			tags,
			pagination,
		},
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = Math.ceil(countSnippets() / config.snippets_per_page)
	if (pages === 0) {
		return {
			paths: [],
			fallback: false,
		}
	}
	const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
		params: { page: (it + 2).toString() },
	}))
	return {
		paths: paths,
		fallback: false,
	}
}
