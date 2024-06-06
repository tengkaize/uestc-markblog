"use client";

import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useActionState, type FC } from "react";
import type { State } from "./action";

const Button: FC<{
	toggleAction: (state: State) => Promise<State>;
	initialState: State;
}> = ({
	toggleAction,
	initialState,
}) => {
	const [{ liked, count }, action, pending] = useActionState(toggleAction, initialState);
	const Icon = liked ? HeartSolidIcon : HeartOutlineIcon;
	return (
		<button
			className={clsx(
				"px-2",
				"py-1",
				"rounded",
				"flex",
				"flex-row",
				"items-center",
				"gap-1",
				"bg-red-500",
				"text-white",
				"font-bold",
				pending && "cursor-progress",
			)}
			onClick={async () => { await action(); }}
			disabled={pending}
		>
			<Icon className="size-4" />
			{count}
		</button>
	);
};

export default Button;
