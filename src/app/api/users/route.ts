import type { NextRequest } from "next/server";
import prisma from "~/lib/prisma";

export const GET = async (_req: NextRequest) => Response.json(await prisma.user.findMany());
