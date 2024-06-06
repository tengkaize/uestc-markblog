import { PrismaClient } from "@prisma/client";

const prismaSingleton = (): PrismaClient => {
	// @ts-expect-error
	return globalThis.prisma ?? (globalThis.prisma = new PrismaClient());
};

export const prisma = process.env.NODE_ENV === "production" ? new PrismaClient() : prismaSingleton();

export default prisma;
