"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Loader2, Lock, Send, Share, Unlock } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import toast from "react-hot-toast";

type Props = { chatId: number; currentChat: any };

const ChatComponent = ({ chatId, currentChat }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(currentChat?.isPublic || false);

  const { data: messagesData, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", { chatId });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: { chatId },
    initialMessages: messagesData,
  });

  useEffect(() => {
    const scrollToBottom = () => {
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTo({ top: messageContainer.scrollHeight, behavior: "smooth" });
      }
    };
    scrollToBottom();
  }, [messages]);

  const handleShareChat = async (isCurrentlyPublic: boolean) => {
    setLoading(true);
    try {
      const response = await axios.put<boolean>("/api/share-chat", { isCurrentlyPublic, chatId });
      setIsPublic(response.data);
      toast.success(`Chat is now ${response.data ? "public" : "private"}`);
    } catch (error) {
      console.error("Error sharing chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const shareButtonLabel = isPublic ? (
    <div className="flex justify-center items-center mr-1">
      <Unlock className="mr-1" width={18} />
      Make Private
    </div>
  ) : (
    <div className="flex justify-center items-center ">
      <Lock className="mr-1" width={18} />
      Make Public
    </div>
  );

  const copyToClipboard = () => {
    if (!isPublic) {
      return toast("Chat is not public.", { icon: "🔒" });
    }
    toast("Link copied to clipboard", { icon: "📋" });
    navigator.clipboard.writeText(`${window.location.origin}/shared/${chatId}`);
  };

  return (
    <div className="relative flex flex-col h-screen">
      <div className="py-2 bg-white border-b-4 border-indigo-500">
        <div className="flex gap-2 text-xl font-bold justify-center items-center">
          <Share
            className="p-1 cursor-pointer transition-colors rounded-md text-gray-600 bg-gray-300 hover:bg-gray-700 hover:text-white"
            size={24}
            onClick={copyToClipboard}
          />
          Chat
          <Button onClick={() => handleShareChat(!isPublic)} disabled={loading}>
            <span>{loading ? <Loader2 className="animate-spin" /> : shareButtonLabel}</span>
          </Button>
        </div>
      </div>

      <div className="flex-grow overflow-scroll" id="message-container">
        <MessageList messages={messages} isLoading={messagesLoading} />
      </div>

      <form
        onSubmit={handleSubmit}
        hidden={messagesLoading}
        className="sticky bottom-0 left-0 inset-x-0 px-2 py-4 mt-1 bg-white"
      >
        <div className="flex">
          <Input value={input} onChange={handleInputChange} placeholder="Ask any question..." className="w-full" />
          <Button type="submit" className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(ChatComponent);
