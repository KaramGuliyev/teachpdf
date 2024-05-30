"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import ShareMessageList from "./ShareMessageList";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

type Props = { chatId: number; currentChat: any };

const SharedChatComponent = ({ chatId, currentChat }: Props) => {
  const { data: messagesData, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", { chatId });
      return response.data;
    },
  });

  const handleSignInButton = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Redirecting to sign-in page...", { icon: "🔒" });
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="py-2 bg-white border-b-4 border-indigo-500">
        <h3 className="flex gap-2 text-xl font-bold justify-center items-center">Chat</h3>
      </div>

      <div className="flex-grow overflow-scroll" id="message-container">
        <ShareMessageList messages={messagesData} isLoading={messagesLoading} />
      </div>

      <form
        onSubmit={handleSignInButton}
        hidden={messagesLoading}
        className="sticky bottom-0 left-0 inset-x-0 px-2 py-2 bg-white"
      >
        <div className="flex">
          <Button type="submit" className="w-full ml-2">
            Start TeachPDF
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(SharedChatComponent);
