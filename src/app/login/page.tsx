import { Field, Input, Label } from "@headlessui/react";
import type { ReactNode } from "react";
import { signIn } from "~/lib/auth";

const Form = ({
	children,
	action,
	name,
}: {
	children?: ReactNode;
	action: (formData: FormData) => void;
	name: string;
}) => (
	<form
		action={action}
		className="w-2/3 py-4 flex flex-col items-center gap-2 border-y"
	>
		{children}
		<button type="submit" className="flex flex-row items-center gap-1 border-2 border-gray-200 hover:border-gray-500 rounded-md p-2">
			Login with {name}
		</button>
	</form>
);

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<Form
				action={async (formData) => {
					"use server";
					await signIn("nodemailer", formData);
				}}
				name="Email"
			>
				<Field>
					<Label className="font-bold">Email</Label>
					<Input className="ml-1 p-1 rounded border-2" name="email" type="email" required />
				</Field>
			</Form>
			<Form
				action={async () => {
					"use server";
					await signIn("github");
				}}
				name="GitHub"
			/>
		</div>
	);
};
