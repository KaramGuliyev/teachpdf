"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send, ShareIcon } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
    console.log(messages);
  }, [messages]);

  return (
    <div className="relative flex flex-col h-screen">
      <div className=" py-2 bg-white border-b-4 border-indigo-500">
        <h3 className="flex gap-2 text-xl font-bold justify-center items-center">
          Chat
          <Button>
            <ShareIcon />
          </Button>
        </h3>
      </div>

      <div className="flex-grow overflow-scroll" id="message-container">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      <form onSubmit={handleSubmit} hidden={isLoading} className="sticky bottom-0 left-0 inset-x-0 px-2 py-4 mt-1 bg-white">
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

export default ChatComponent;
