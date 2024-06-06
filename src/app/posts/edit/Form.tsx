"use client";

import { Description, Field, Input, Label, Textarea } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useActionState, type FC } from "react";
import type { State } from "./action";

export const Form: FC<{
	action: (state: State, formData: FormData) => Promise<State>;
	title: string;
	markdown: string;
}> = ({
	action,
	title,
	markdown,
}) => {
	const [state, formAction, pending] = useActionState(action, null);
	const message = (
		state ? (
			state.success ? (
				<Link className="bg-green-100 underline" href={`/posts/${state.postId}`}>Updated post</Link>
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
					Edit the title of your post
				</Description>
				<Input
					className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded"
					name="title"
					defaultValue={state?.success && state.updatedTitle || title}
					required
				/>
			</Field>
			<Field>
				<Label className="font-bold">Content</Label>
				<Description className="text-sm text-gray-500">
					Edit your post in markdown
				</Description>
				<Textarea
					className="w-80 border-2 border-gray-300 data-[focus]:border-gray-600 p-1 rounded font-mono"
					name="markdown"
					defaultValue={state?.success && state.updatedMarkdown || markdown}
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
					"font-sans",
					"font-bold",
				)}
				type="submit"
				disabled={pending}
			>
				{pending ? "Submitting..." : "Submit"}
			</button>
			{message}
		</form>
	);
};

export default Form;
