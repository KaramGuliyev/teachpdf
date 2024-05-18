import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import ErrorPage from "@/components/ErrorPage";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const userChats = await db.select().from(chats).where(eq(chats.userId, userId));

  if (!userChats || userChats.length === 0) {
    return <ErrorPage errorCode={404} errorMessage="No chats found for user" />;
  }

  const currentChatId = parseInt(chatId);
  const currentChat = userChats.find((chat) => chat.id === currentChatId);
  const isPro = await checkSubscription();

  if (!currentChat) {
    return <ErrorPage errorCode={404} />;
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* Chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={userChats} chatId={currentChatId} isPro={isPro} />
        </div>
        {/* PDF viewer */}
        <div className="max-h-screen p-4 overflow-scroll flex-[5]">
          <PDFViewer pdf_url={currentChat.pdfURL || ""} />
        </div>
        {/* Chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={currentChatId} currentChat={currentChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
