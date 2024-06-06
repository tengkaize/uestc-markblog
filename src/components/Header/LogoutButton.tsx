"use client";

import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { FC, ComponentPropsWithRef } from "react";

export const LogoutButton: FC<ComponentPropsWithRef<"button"> & {
	logoutAction: () => Promise<void>;
}> = ({
	logoutAction,
	className,
	...rest
}) => (
	<button
		{...rest}
		className={clsx("inline-flex flex-row items-center gap-1 data-[focus]:text-red-600", className)}
		onClick={async () => { await logoutAction(); }}
	>
		<ArrowLeftStartOnRectangleIcon className="size-4" />
		Logout
	</button>
);

export default LogoutButton;
