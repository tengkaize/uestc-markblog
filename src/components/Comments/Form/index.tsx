"use client";

import clsx from "clsx";
import { useActionState, useEffect, type FC } from "react";
import { useRouter } from "next/navigation";
import {
	Field,
	Label,
	Description,
	Textarea,
} from "@headlessui/react";
import type { State } from "./action";

export const Form: FC<{
	action: (state: State, formData: FormData) => Promise<State>;
}> = ({
	action,
}) => {
	const router = useRouter();
	const [state, formAction, pending] = useActionState(action, null);
	useEffect(
		() => {
			if (state?.success) {
				router.refresh();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state],
	);
	return (
		<form className="my-4 flex flex-col gap-4 items-center" action={formAction}>
			<Field>
				<Label className="font-bold">Comment</Label>
				<Description className="text-sm text-gray-500">
					Write your comment in markdown
				</Description>
				<Textarea
					className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded font-mono"
					name="markdown"
					required
				/>
			</Field>
			<button
				className={clsx(
					"border-2",
					"border-gray-300",
					"hover:border-gray-600",
					"p-1",
					"rounded",
					pending && "cursor-progress",
					state && !state.success && "border-red-500",
					"font-sans",
					"font-bold",
				)}
				type="submit"
				disabled={pending}
			>
				{pending ? "Submitting..." : "Submit"}
			</button>
			{state && !state.success && <p className="text-red-500">{state.reason}</p>}
		</form>
	);
};

export default Form;
