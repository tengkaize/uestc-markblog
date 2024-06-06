import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Avatar from "~/components/Avatar";
import CreatedAt from "~/components/CreatedAt";
import prisma from "~/lib/prisma";

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async () => {
	const posts = await prisma.post.findMany({
		include: {
			author: true,
			_count: {
				select: {
					likes: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return (
		<ul className="mx-auto flex flex-col items-center divide-y">
			{posts.map(({
				id,
				title,
				createdAt,
				author,
				_count,
			}) => (
				<li
					key={id}
					className="w-2/3 py-4 flex flex-col items-center gap-1"
				>
					<Link
						href={`/posts/${id}`}
						className="text-2xl font-serif"
					>
						{title}
					</Link>
					<Link href={`/profile/${author.id}`} className="inline-flex flex-row items-center gap-1">
						<Avatar className="size-5" user={author} />
						{author.name}
					</Link>
					<CreatedAt date={createdAt} />
					<span className="flex flex-row items-center gap-1"><HeartIcon className="size-4 text-red-500" /> {_count.likes}</span>
				</li>
			))}
		</ul>
	);
};
