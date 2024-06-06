import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, type FC } from "react";
import Avatar from "~/components/Avatar";
import { currentUser } from "~/lib/auth";
import { markdownToHtml } from "~/lib/markdown";
import prisma from "~/lib/prisma";
import DeleteComment from "./DeleteComment";

const PostManager: FC<{
	authorId: string;
}> = async ({
	authorId,
}) => {
	const posts = await prisma.post.findMany({
		where: {
			authorId,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return (
		<div className="flex flex-col items-center">
			<p className="text-xl font-bold">Your posts</p>
			<ul className="mt-4 flex flex-col items-center gap-2">{posts.map(({ id, title }) => (
				<li
					key={id}
					className="flex flex-col items-center gap-1 p-2 border rounded"
				>
					<Link
						className="text-lg font-serif"
						href={`/posts/${id}`}
					>
						{title}
					</Link>
					<div className="flex flex-row gap-1">
						<Link
							className="px-2 py-1 border rounded"
							href={{
								pathname: "/posts/edit",
								query: { id },
							}}
						>
							Edit
						</Link>
						<Link
							className="px-2 py-1 border rounded"
							href={{
								pathname: "/posts/delete",
								query: { id },
							}}
						>
							Delete
						</Link>
					</div>
				</li>
			))}</ul>
		</div>
	);
};

const CommentManager: FC<{
	userId: string;
}> = async ({
	userId,
}) => {
	const comments = await prisma.comment.findMany({
		where: {
			userId,
		},
		orderBy: {
			createdAt: "desc",
		},
		include: {
			post: {
				select: {
					id: true,
					title: true,
				},
			},
		},
	});
	return (
		<div className="flex flex-col items-center">
			<p className="text-xl font-bold">Your comments</p>
			<ul className="mt-4 flex flex-col items-center gap-2">{comments.map(async ({ id, post, markdown }) => (
				<li
					key={id}
					className="flex flex-col items-center gap-1 p-2 border rounded"
				>
					<p>Comment on <Link href={`/posts/${post.id}`} className="font-serif">{post.title}</Link></p>
					<DeleteComment
						deleteAction={async (_: boolean) => {
							"use server";
							await prisma.comment.delete({ where: { id } });
							return true;
						}}
					/>
					<article
						className="w-full p-2 border prose-sm"
						dangerouslySetInnerHTML={{ __html: await markdownToHtml(markdown) }}
					/>
				</li>
			))}</ul>
		</div>
	);
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async () => {
	const user = await currentUser();
	if (!user) redirect("/login");
	return (
		<figure className="mx-auto flex flex-col items-center gap-8">
			<div className="flex flex-col items-center">
				<Avatar className="size-20" user={user} />
				<p>{user.name}</p>
			</div>
			<Suspense fallback={<div>Loading posts...</div>}>
				<PostManager authorId={user.id} />
			</Suspense>
			<Suspense fallback={<div>Loading comments...</div>}>
				<CommentManager userId={user.id} />
			</Suspense>
		</figure>
	);
};
