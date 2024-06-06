import type {
	PrismaClient,
	Account,
} from "@prisma/client";

import type {
	Adapter,
	AdapterAccount,
} from "next-auth/adapters";

export const adaptPrismaAccount: (account: Account) => AdapterAccount = ({
	userId,
	type,
	provider,
	providerAccountId,
	refreshToken,
	accessToken,
	expiresAt,
	tokenType,
	scope,
	idToken,
}) => ({
	userId,
	type: type as AdapterAccount["type"],
	provider,
	providerAccountId,
	refresh_token: refreshToken ?? undefined,
	access_token: accessToken ?? undefined,
	expires_at: expiresAt ?? undefined,
	token_type: (tokenType ?? undefined) as AdapterAccount["token_type"],
	scope: scope ?? undefined,
	id_token: idToken ?? undefined,
});

const o = <T, U>(f: (x: T) => U) => ((x: T | null) => (x === null ? null : f(x)));

export const makeAdapter = (prisma: PrismaClient): Adapter => ({
	createUser: (user) => (
		prisma.user
			.create({ data: user })
	),
	getUser: (id) => (
		prisma.user
			.findUnique({ where: { id } })
	),
	getUserByEmail: (email) => (
		prisma.user
			.findUnique({ where: { email } })
	),
	getUserByAccount: (provider_providerAccountId) => (
		prisma.account
			.findUnique({ where: { provider_providerAccountId } })
			.user()
	),
	updateUser: (user) => (
		prisma.user
			.update({
				where: { id: user.id },
				data: user,
			})
	),
	deleteUser: (id) => (
		prisma.user
			.delete({ where: { id } })
	),
	linkAccount: async ({
		userId,
		type,
		provider,
		providerAccountId,
		refresh_token,
		access_token,
		expires_at,
		token_type,
		scope,
		id_token,
	}) => {
		const account = await prisma.account.create({
			data: {
				userId,
				type,
				provider,
				providerAccountId,
				refreshToken: refresh_token ?? null,
				accessToken: access_token ?? null,
				expiresAt: expires_at ?? null,
				tokenType: token_type ?? null,
				scope: scope ?? null,
				idToken: id_token ?? null,
			} satisfies Account,
		});
		return adaptPrismaAccount(account);
	},
	unlinkAccount: async (provider_providerAccountId) => {
		const account = await prisma.account.delete({ where: { provider_providerAccountId } });
		return adaptPrismaAccount(account);
	},
	createSession: (session) => (
		prisma.session
			.create({ data: session })
	),
	getSessionAndUser: async (sessionToken) => {
		const $session = await prisma.session.findUnique({
			where: { sessionToken },
			include: { user: true },
		});
		if (!$session) return null;
		const { user, ...session } = $session;
		return { session, user };
	},
	updateSession: (session) => (
		prisma.session
			.update({
				where: { sessionToken: session.sessionToken },
				data: session,
			})
	),
	deleteSession: (sessionToken) => (
		prisma.session
			.delete({ where: { sessionToken } })
	),
	createVerificationToken: (verificationToken) => (
		prisma.verificationToken
			.create({ data: verificationToken })
	),
	useVerificationToken: ({ identifier, token }) => (
		prisma.verificationToken
			.delete({ where: { identifier_token: { identifier, token } } })
	),
	getAccount: (providerAccountId, provider) => (
		prisma.account
			.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId } } })
			.then(o(adaptPrismaAccount))
	),
});
