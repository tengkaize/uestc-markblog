"use server";

import z from "zod";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";

export type State =
	| null
	| { success: false; reason: string; }
	| { success: true; postId: string; }
	;

const schema = z.object({
	title: z.string(),
	markdown: z.string(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (_: State, formData: FormData): Promise<State> => {
	const user = await currentUser();
	if (!user) return { success: false, reason: "Unauthorized user is not permitted to create post" };
	const { success, data, error } = await schema.spa(Object.fromEntries(formData));
	if (!success) return { success: false, reason: error.message };
	const { id } = await prisma.post.create({
		data: {
			...data,
			author: { connect: { id: user.id } },
		},
	});
	return { success: true, postId: id };
};
