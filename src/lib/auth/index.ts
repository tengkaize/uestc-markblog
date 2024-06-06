import NextAuth from "next-auth";
import nodemailer from "next-auth/providers/nodemailer";
import github from "next-auth/providers/github";
import { makeAdapter } from "./adapter";
import prisma from "../prisma";

export const {
	handlers,
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		nodemailer({
			server: {
				host: "smtp.qiye.aliyun.com",
				port: 465,
				secure: true,
				auth: {
					user: process.env.AUTH_EMAIL_USER,
					pass: process.env.AUTH_EMAIL_PASS,
				},
			},
		}),
		github({}),
	],
	adapter: makeAdapter(prisma),
});

export const currentUser = async () => {
	const session = await auth();
	const id = session?.user?.id;
	if (!id) return null;
	return prisma.user.findUnique({ where: { id } });
};
