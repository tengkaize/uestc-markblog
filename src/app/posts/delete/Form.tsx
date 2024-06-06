"use client";

import clsx from "clsx";
import { useActionState, type FC } from "react";
import type { State } from "./action";
import { Description, Field, Input, Label } from "@headlessui/react";

const Form: FC<{
	action: (state: State, formData: FormData) => Promise<State>;
}> = ({
	action,
}) => {
	const [state, formAction, pending] = useActionState(action, null);
	const message = (
		state ? (
			state.success ? (
				<p className="bg-green-100">You&apos;ve successfully deleted your post</p>
			) : (
				<p className="bg-red-100">{state.reason}</p>
			)
		) : (
			null
		)
	);
	return (
		<form className="flex flex-col gap-4 items-center" action={formAction}>
			<Field>
				<Label className="font-bold">UUID</Label>
				<Description className="text-sm text-gray-500">
					Enter the UUID of the post to confirm your operation
				</Description>
				<Input className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded" name="uuid" required />
			</Field>
			<button
				type="submit"
				className={clsx(
					"border-2",
					"p-1",
					"rounded",
					(pending || state?.success) ? [
						"bg-gray-500",
						"border-gray-300",
						"hover:border-gray-600",
					] : [
						"bg-red-500",
						"border-red-300",
						"hover:border-red-600",
					],
					"text-white",
					"font-bold",
				)}
				disabled={pending || state?.success}
			>
				{pending ? "Deleting" : "Delete"}
			</button>
			{message}
		</form>
	);
};

export default Form;
