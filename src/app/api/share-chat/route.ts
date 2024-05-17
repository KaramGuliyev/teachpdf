import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { isCurrentlyPublic, chatId } = await req.json();
    await db.update(chats).set({ isPublic: isCurrentlyPublic }).where(eq(chats.id, chatId));
    const updatedChat = await db.select().from(chats).where(eq(chats.id, chatId)).limit(1);
    const isPublic = updatedChat[0].isPublic;
    return NextResponse.json(isPublic, { status: 200 });
  } catch (error) {
    console.error("Error updating chat:", error);
    return NextResponse.json({ error: "Failed to update chat" }, { status: 500 });
  }
}
