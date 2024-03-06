"use client";

import { InboxIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

type Props = {};

const FileUpload = (props: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
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
