import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export const PUT = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    // Mise à jour de l'utilisateur avec les nouvelles valeurs
    const updatedUser = await db
      .update(users)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
};
