import ErrorPage from "@/components/ErrorPage";
import PDFViewer from "@/components/PDFViewer";
import SharedChatComponent from "@/components/SharedChatComponent";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const SharePage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const currentChat = await db
    .select()
    .from(chats)
    .where(eq(chats.id, parseInt(chatId)))
    .limit(1);

  if (!currentChat[0]) {
    return <ErrorPage errorCode={404} />;
  }

  if (!currentChat[0].isPublic) {
    return <ErrorPage errorCode={401} />;
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* PDF viewer */}
        <div className="max-h-screen p-4 border-r-slate-200 border-l-slate-200 overflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat[0].pdfURL} />
        </div>
        {/* Shared chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <SharedChatComponent chatId={parseInt(chatId)} currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default SharePage;
