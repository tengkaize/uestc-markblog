import clsx from "clsx";
import type { FC } from "react";
import Image from "next/image";
import type { User } from "@prisma/client";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export const Fallback: FC<{ className?: string }> = ({ className }) => <UserCircleIcon className={className} />;

export const Avatar: FC<{
	className?: string;
	user: User;
}> = ({
	className,
	user: { image, name, id },
}) => (
	image
		? <Image src={image} width="300" height="300" alt={`Avatar for ${name ?? id}`} className={clsx(className, "aspect-square", "rounded-full")} />
		: <Fallback className={className} />
);

export default Avatar;
