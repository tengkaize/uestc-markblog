import type { FC } from "react";

const CreatedAt: FC<{
	className?: string;
	date: Date;
}> = ({
	className,
	date,
}) => (
	<time
		className={className}
		dateTime={date.toISOString()}
	>
		{date.toLocaleDateString("zh-Hans")}
	</time>
);

export default CreatedAt;
