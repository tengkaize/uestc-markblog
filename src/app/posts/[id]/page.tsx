import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "~/components/Avatar";
import Comments from "~/components/Comments";
import CreatedAt from "~/components/CreatedAt";
import Likes from "~/components/Likes";
import { markdownToHtml } from "~/lib/markdown";
import prisma from "~/lib/prisma";

type Params = {
	id: string;
};

type Props = {
	params: Params;
};

export const generateMetadata = async ({
	params: { id },
}: Props) => {
	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
		},
	});
	if (!post) notFound();
	const { title, author, createdAt } = post;
	return {
		title,
		openGraph: {
			type: "article",
			title,
			authors: author.name,
			publishedTime: createdAt.toISOString(),
		},
	} satisfies Metadata;
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async ({
	params: { id },
}: Props) => {
	const post = await prisma.post.findUnique({
		where: { id },
		include: {
			author: true,
		},
	});
	if (!post) notFound();
	const {
		title,
		author,
		markdown,
		createdAt,
	} = post;
	return (
		<article className="mx-auto max-w-prose">
			<header className="py-4 my-6 border-y flex flex-col items-center gap-2">
				<div className="text-5xl font-serif font-extrabold">
					{title}
				</div>
				<Link
					href={`/profile/${author.id}`}
					className="flex flex-row gap-1 items-center"
				>
					<Avatar className="h-6 w-6" user={author} />
					{author.name}
				</Link>
				<CreatedAt date={createdAt} />
				<Likes postId={id} />
			</header>
			<main
				className="prose"
				dangerouslySetInnerHTML={{ __html: await markdownToHtml(markdown) }}
			/>
			<Comments postId={id} />
		</article>
	);
};
