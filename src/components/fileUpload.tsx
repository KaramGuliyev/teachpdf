"use client";

import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { InboxIcon, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type Props = {};

const FileUpload = (props: Props) => {
  const [pdfLink, setPdfLink] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<"dropzone" | "link">("dropzone");
  const router = useRouter();

  const handlePdfLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPdfLink(e.target.value);
  };

  const handlePdfSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pdfLink.trim() === "") {
      toast.error("PDF link cannot be empty");
      return;
    }
    uploadPdfFromLink(pdfLink);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }
      try {
        toast("Uploading PDF...", { icon: "🚀" });
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong");
          return;
        }
        toast("Creating chat...", { icon: "🚀" });
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success("Chat created!");
            router.push(`/chat/${chat_id}`);
          },
          onError: (err) => {
            toast.error("Error creating chat");
            console.error(err);
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
      }
    },
  });

  const uploadPdfFromLink = async (pdfLink: string) => {
    try {
      setUploading(true);
      const response = await axios.get(pdfLink, {
        responseType: "blob",
      });
      const file = new File([response.data], "uploaded.pdf", { type: "application/pdf" });
      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10mb!
        toast.error("File too large");
        return;
      }
      const data = await uploadToS3(file);
      console.log(data + "data");

      if (!data?.file_key || !data.file_name) {
        toast.error("Something went wrong!" + data);
        return;
      }
      mutate(data, {
        onSuccess: ({ chat_id }) => {
          toast.success("Chat created!");
          router.push(`/chat/${chat_id}`);
        },
        onError: (err) => {
          toast.error("Error creating chat");
          console.error(err);
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleUploadMethodChange = (method: "dropzone" | "link") => {
    setUploadMethod(method);
  };

  const renderUploadButton = () => {
    if (uploading || isPending) {
      return (
        <Button
          className="text-white w-fit h-full ml-2  py-3 end-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled
        >
          Uploading
          <Loader2 className="animate-spin h-5" />
        </Button>
      );
    } else {
      return (
        <Button
          className="text-white w-fit h-full ml-2  py-3  end-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-smdark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="submit"
        >
          Upload PDF
        </Button>
      );
    }
  };
  return (
    <div className="p-2 bg-white rounded-xl">
      <div className="flex justify-center mb-2">
        <Button
          className={`px-4 mx-1 py-2 rounded-lg text-sm font-medium ${
            uploadMethod === "dropzone" ? " text-green-300" : "hover:text-white bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleUploadMethodChange("dropzone")}
        >
          Drag & Drop
        </Button>
        <Button
          className={`px-4 mx-1 py-2 rounded-lg text-sm font-medium ${
            uploadMethod === "link" ? " text-green-300" : "hover:text-white bg-gray-200 text-gray-600"
          }`}
          onClick={() => handleUploadMethodChange("link")}
        >
          Upload with Link
        </Button>
      </div>
      {uploadMethod === "dropzone" ? (
        <div
          {...getRootProps({
            className:
              "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-4 flex justify-center items-center flex-col",
          })}
        >
          <input type="text" {...getInputProps()} />
          {uploading || isPending ? (
            <>
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
              <p className="mt-2 text-sm text-slate-400">Learning PDF</p>
            </>
          ) : (
            <>
              <InboxIcon className="w-10 h-10 text-primary" />
              <p className="mt-2 text-sm text-slate-400">Drag&Drop your PDFs here!</p>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handlePdfSubmit}>
          <label htmlFor="pdfLink" className="text-sm font-medium text-gray-900 sr-only dark:text-white">
            PDF Link
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="pdfLink"
              value={pdfLink}
              onChange={handlePdfLinkChange}
              className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter PDF link"
              required
            />
            {renderUploadButton()}
          </div>
        </form>
      )}
    </div>
  );
};

export default FileUpload;
