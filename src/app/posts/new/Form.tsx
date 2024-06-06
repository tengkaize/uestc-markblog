"use client";

import clsx from "clsx";
import Link from "next/link";
import { useActionState, type FC } from "react";
import action from "./action";
import { Description, Field, Input, Label, Textarea } from "@headlessui/react";

export const Form: FC = () => {
	const [state, formAction, pending] = useActionState(action, null);
	const message = (
		state ? (
			state.success ? (
				<Link className="bg-green-100 underline" href={`/posts/${state.postId}`}>Created post</Link>
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
				<Label className="font-bold">Title</Label>
				<Description className="text-sm text-gray-500">
					Enter the title of your post
				</Description>
				<Input className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded" name="title" required />
			</Field>
			<Field>
				<Label className="font-bold">Content</Label>
				<Description className="text-sm text-gray-500">
					Write your post in markdown
				</Description>
				<Textarea className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded font-mono" name="markdown" required />
			</Field>
			<button
				className={clsx(
					"border-2",
					"border-gray-300",
					"hover:border-gray-600",
					"p-1",
					"rounded",
					pending && "cursor-progress",
					state?.success && [
						"cursor-not-allowed",
						"border-green-500",
					],
					"font-sans",
					"font-bold",
				)}
				type="submit"
				disabled={pending || state?.success}
			>
				{pending ? "Submitting..." : "Submit"}
			</button>
			{message}
		</form>
	);
};

export default Form;
