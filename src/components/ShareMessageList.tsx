import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[] | undefined;
};

const ShareMessageList = ({ messages, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-4 my-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn("rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10", {
              "bg-blue-600 text-white": message.role === "user",
            })}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShareMessageList;
