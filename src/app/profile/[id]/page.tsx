import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "~/components/Avatar";
import prisma from "~/lib/prisma";

type Params = {
	id: string;
};

type Props = {
	params: Params;
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async ({
	params: { id },
}: Props) => {
	const user = await prisma.user.findUnique({
		where: { id },
		include: {
			posts: true,
		},
	});
	if (!user) notFound();
	return (
		<div className="mx-auto flex flex-col items-center">
			<Avatar className="size-20" user={user} />
			<p>{user.name}</p>
			<ul className="flex flex-col">{user.posts.map(({ id, title }) => (
				<li key={id}>
					<Link href={`/posts/${id}`}>
						{title}
					</Link>
				</li>
			))}</ul>
		</div>
	);
};
