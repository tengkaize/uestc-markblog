import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";
import Form from "./Form";
import action from "./action";

type SearchParams = {
	id?: string;
};

type Props = {
	searchParams: SearchParams;
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async ({
	searchParams: { id },
}: Props) => {
	const user = await currentUser();
	if (!user) {
		return (
			<p>You should <Link className="font-bold underline" href="/login">login</Link> first to edit posts.</p>
		);
	}
	if (!id) {
		return (
			<p>Select the post first.</p>
		);
	}
	const post = await prisma.post.findUnique({ where: { id } });
	if (!post) notFound();
	if (user.id !== post.authorId) {
		return (
			<p>You are not <Link href={`/profile/${post.authorId}`}>the author</Link> of the post</p>
		);
	}
	return (
		<Form
			action={action.bind(null, post)}
			title={post.title}
			markdown={post.markdown}
		/>
	);
};
