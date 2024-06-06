"use server";

import { redirect } from "next/navigation";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";

export type State =
	| { liked: false, count: number }
	| { liked: true, count: number }
	;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (postId: string, { liked, count }: State): Promise<State> => {
	const user = await currentUser();
	if (!user) redirect("/login");
	if (liked) {
		await prisma.like.delete({
			where: {
				userId_postId: {
					userId: user.id,
					postId,
				},
			},
		});
		return { liked: false, count: count - 1 };
	}
	else {
		await prisma.like.create({
			data: {
				user: { connect: user },
				post: { connect: { id: postId } },
			},
		});
		return { liked: true, count: count + 1 };
	}
};
