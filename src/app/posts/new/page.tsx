import { redirect } from "next/navigation";
import { currentUser } from "~/lib/auth";
import Form from "./Form";

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default async () => {
	const user = await currentUser();
	if (!user) redirect("/login");
	return <Form />;
};
