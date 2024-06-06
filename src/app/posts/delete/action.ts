"use server";

import type { Post } from "@prisma/client";
import z from "zod";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";

const schema = z.object({
	uuid: z.string().uuid(),
});

export type State =
	| null
	| { success: true }
	| { success: false, reason: string }
	;

// eslint-disable-next-line import/no-anonymous-default-export
export default async (post: Post, _state: State, formData: FormData): Promise<State> => {
	const user = await currentUser();
	if (!user) return { success: false, reason: "Unauthorized" };
	if (user.id !== post.authorId) return { success: false, reason: "You are not the author of the post" };
	const { success, data } = await schema.spa(Object.fromEntries(formData));
	if (!success || data.uuid !== post.id) return { success: false, reason: "Please enter correct UUID" };
	await prisma.post.delete({
		where: { id: post.id },
	});
	return { success: true };
};
