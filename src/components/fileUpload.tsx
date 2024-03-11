"use client";

import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

type Props = {};

const FileUpload = (props: Props) => {
  const { mutate } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      const response = await axios.post("/api/create-chat", { file_key, file_name });
      return response.data;
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size is more than 10MB");
        return;
      }

      try {
        const data = await uploadToS3(file);
        if (!data?.file_key || !data.file_name) {
          alert("Something went wrong!");
          return;
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-4 flex justify-center items-center flex-col",
        })}
      >
        <input type="text" {...getInputProps()} />
        <InboxIcon className="w-10 h-10 text-blue-500" />
        <p className="mt-2 text-sm text-slate-400">Drag&Drop your PDFs here!</p>
      </div>
    </div>
  );
};

export default FileUpload;
