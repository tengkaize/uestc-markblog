import type { Comment, User } from "@prisma/client";
import Link from "next/link";
import { Suspense, type FC } from "react";
import { markdownToHtml } from "~/lib/markdown";
import prisma from "~/lib/prisma";
import Avatar from "../Avatar";
import Form from "./Form";
import action from "./Form/action";

const CommentListItem: FC<{
	comment: Comment & { user: User };
}> = async ({
	comment: {
		markdown,
		createdAt,
		user,
	},
}) => (
	<li className="border rounded p-4 flex flex-col gap-1">
		<Link href={`/profile/${user.id}`} className="flex flex-row gap-1 items-center">
			<Avatar className="size-5" user={user} />
			{user.name}
		</Link>
		<time className="text-sm" dateTime={createdAt.toISOString()}>
			{createdAt.toLocaleString()}
		</time>
		<article
			className="prose-sm"
			dangerouslySetInnerHTML={{ __html: await markdownToHtml(markdown) }}
		/>
	</li>
);

const CommentList: FC<{
	postId: string;
}> = async ({
	postId,
}) => {
	const comments = await prisma.comment.findMany({
		where: {
			postId,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: true,
		},
	});
	return (
		<ul className="flex flex-col gap-1 divide-y">{comments.map(comment => (
			<CommentListItem
				key={comment.id}
				comment={comment}
			/>
		))}</ul>
	);
};

export const Comments: FC<{
	postId: string;
}> = ({
	postId,
}) => {
	return (
		<section className="mt-6">
			<Form action={action.bind(null, postId)} />
			<Suspense fallback={<div>Loading comments...</div>}>
				<CommentList postId={postId} />
			</Suspense>
		</section>
	);
};

export default Comments;
