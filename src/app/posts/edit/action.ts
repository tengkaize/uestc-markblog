"use server";

import type { Post } from "@prisma/client";
import z from "zod";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";

export type State =
	| null
	| { success: false; reason: string; }
	| { success: true; postId: string; updatedTitle: string; updatedMarkdown: string; }
	;

const schema = z.object({
	title: z.string(),
	markdown: z.string(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (post: Post, _: State, formData: FormData): Promise<State> => {
	const user = await currentUser();
	if (!user) return { success: false, reason: "Unauthorized" };
	if (user.id !== post.authorId) return { success: false, reason: "You are not the author of the post" };
	const { success, data, error } = await schema.spa(Object.fromEntries(formData));
	if (!success) return { success: false, reason: error.message };
	const {
		title: updatedTitle,
		markdown: updatedMarkdown,
	} = await prisma.post.update({
		where: { id: post.id },
		data,
	});
	return {
		success: true,
		postId: post.id,
		updatedTitle,
		updatedMarkdown,
	};
};
