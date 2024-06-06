import type { FC } from "react";
import { currentUser } from "~/lib/auth";
import prisma from "~/lib/prisma";
import Button from "./button";
import action from "./action";

export const Likes: FC<{
	postId: string;
}> = async ({
	postId,
}) => {
	const user = await currentUser();
	const count = await prisma.like.count({
		where: {
			postId,
		},
	});
	const liked = (user ? !!await prisma.like.findUnique({
		where: {
			userId_postId: {
				userId: user.id,
				postId,
			},
		},
	}) : false);
	return <Button toggleAction={action.bind(null, postId)} initialState={{ liked, count }} />;
};

export default Likes;
