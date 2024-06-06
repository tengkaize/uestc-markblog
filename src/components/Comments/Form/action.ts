"use server";

import z from "zod";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";

export type State =
	| null
	| { success: false; reason: string; }
	| { success: true; commentId: string; }
	;

const schema = z.object({
	markdown: z.string(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (postId: string, _: State, formData: FormData): Promise<State> => {
	const user = await currentUser();
	if (!user) return { success: false, reason: "Unauthorized user is not permitted to create comment" };
	const { success, data, error } = await schema.spa(Object.fromEntries(formData));
	if (!success) return { success: false, reason: error.message };
	const { id } = await prisma.comment.create({
		data: {
			...data,
			user: { connect: { id: user.id } },
			post: { connect: { id: postId } },
		},
	});
	return { success: true, commentId: id };
};
