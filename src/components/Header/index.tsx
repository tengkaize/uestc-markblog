import { currentUser, signOut } from "~/lib/auth";
import {
	Transition,
	Menu,
	MenuButton,
	MenuItems,
	MenuItem,
	MenuSeparator,
} from "@headlessui/react";
import {
	HomeIcon,
	PencilIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import NavLink from "./NavLink";
import Avatar, { Fallback } from "../Avatar";
import LogoutButton from "./LogoutButton";

export const Header = async () => {
	const user = await currentUser();
	return (
		<header className="h-12 w-full px-4 mb-6 top-0 sticky bg-gray-100/70 backdrop-blur shadow-lg border-b flex flex-row items-center">
			<nav className="basis-3/4 overflow-x-auto gap-4 flex flex-row flex-nowrap items-center">
				<NavLink
					href="/"
					icon={<HomeIcon className="size-5" />}
					text="Home"
				/>
				<NavLink
					href="/posts/new"
					icon={<PencilIcon className="size-5" />}
					text="New Post"
				/>
			</nav>
			<span className="flex-1" />
			{user ? (
				<Menu>
					<MenuButton className="border-2 border-transparent data-[active]:border-gray-300 rounded-full">
						<Avatar className="size-6" user={user} />
					</MenuButton>
					<Transition
						enter="transition ease-out duration-75"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<MenuItems
							anchor="bottom start"
							className="[--anchor-gap:8px] px-4 py-2 w-36 origin-top rounded-xl border bg-white/10 backdrop-blur"
						>
							<MenuItem>
								<Link
									href="/profile"
									className="inline-flex flex-row items-center gap-1 data-[focus]:text-blue-600"
								>
									<UserIcon className="size-4" />
									Profile
								</Link>
							</MenuItem>
							<MenuSeparator className="my-1 h-px bg-gray-200" />
							<MenuItem>
								<LogoutButton logoutAction={async () => {
									"use server";
									await signOut();
								}} />
							</MenuItem>
						</MenuItems>
					</Transition>
				</Menu>
			) : (
				<Link className="border-2 border-transparent text-gray-400 hover:text-blue-600" href="/login">
					<Fallback className="size-6" />
				</Link>
			)}
		</header>
	);
};

export default Header;
