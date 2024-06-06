import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "~/components/Header";

export const metadata: Metadata = {
	title: {
		default: "Teng Kaize's Blog",
		template: "%s | Teng Kaize's Blog",
	},
	openGraph: {
		type: "website",
		title: "Teng Kaize's Blog",
		siteName: "Teng Kaize's Blog",
	},
};

export const dynamic = "force-dynamic";

type Props = {
	children: ReactNode;
};

// eslint-disable-next-line react/display-name, import/no-anonymous-default-export
export default ({ children }: Props) => (
	<html lang="en">
		<body className="min-h-dvh w-dvw">
			<Header />
			<main>{children}</main>
		</body>
	</html>
);
