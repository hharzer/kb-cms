import Date from "./Date"
import Link from "next/link"
import { parseISO } from "date-fns"
import { SnippetContent } from "../lib/snippets"

type Props = {
	snippet: SnippetContent
}
export default function PostItem({ snippet }: Props) {
	return (
		<Link href={"/snippets/" + snippet.slug}>
			<a>
				<Date date={parseISO(snippet.date)} />
				<h2>{snippet.title}</h2>
				<style jsx>
					{`
						a {
							color: #222;
							display: inline-block;
						}
						h2 {
							margin: 0;
							font-weight: 500;
						}
					`}
				</style>
			</a>
		</Link>
	)
}
