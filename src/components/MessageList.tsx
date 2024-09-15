import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import { Copy, Loader2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  const copyToClipboard = (text: string) => {
    toast("Copied to clipboard", { icon: "📋" });
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (!messages || messages.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 px-4 my-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex flex-col", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          {message.role === "system" && (
            <div className="flex justify-between mt-1 max-w-96 mb-1">
              <h1 className="font-bold">TeachPDF</h1>
              <button
                onClick={() => copyToClipboard(message.content)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-xs flex items-center"
              >
                <Copy className="w-3 h-3 mr-1" /> Copy
              </button>
            </div>
          )}
          <div
            className={cn("relative rounded-lg max-w-96 px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10", {
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

export default MessageList;
