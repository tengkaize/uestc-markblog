"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, type FC } from "react";

const DeleteComment: FC<{
	deleteAction: (_: boolean) => Promise<boolean>;
}> = ({
	deleteAction,
}) => {
	const router = useRouter();
	const [state, action, pending] = useActionState(deleteAction, false);
	useEffect(
		() => {
			if (state) {
				router.refresh();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state],
	);
	return (
		<button
			className={clsx(
				"border",
				"border-gray-300",
				"hover:border-gray-600",
				"p-1",
				"rounded",
				pending && "cursor-progress",
			)}
			onClick={async () => { await action(); }}
		>
			{pending ? "Deleting" : "Delete"}
		</button>
	);
};

export default DeleteComment;
