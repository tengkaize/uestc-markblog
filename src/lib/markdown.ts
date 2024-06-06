import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";

export const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeShiki, {
		theme: "nord",
	})
	.use(rehypeStringify)
	.freeze();

export const markdownToHtml = async (markdown: string) => (await processor.process(markdown)).toString();
