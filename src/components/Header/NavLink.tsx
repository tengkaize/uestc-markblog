"use client";

import type { FC, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export const NavLink: FC<{
	href: string;
	icon: ReactNode;
	text: string;
}> = ({
	href,
	icon,
	text,
}) => {
	const pathname = usePathname();
	return (
		<Link
			href={href}
			className="inline-flex flex-row gap-1 items-center"
		>
			{icon}
			<span
				className={clsx(
					"text-nowrap",
					"font-sans",
					"font-extrabold",
					pathname === href && "underline",
				)}
			>
				{text}
			</span>
		</Link>
	);
};

export default NavLink;
