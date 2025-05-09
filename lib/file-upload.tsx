"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useCallback } from "react";

interface FileUploadProps {
  onChange: (url?: string, key?: string) => void;
}

export default function FileUpload({ onChange }: FileUploadProps) {
  const handleUploadComplete = useCallback(
    (res: any) => {
      if (res && res.length > 0) {
        const fileUrl = res[0].url;
        const fileKey = res[0].key;
        onChange(fileUrl, fileKey);
      }
    },
    [onChange]
  );

  return (
    <UploadDropzone
      endpoint="imageUploader" // This should match your uploadthing backend endpoint
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(error) => console.error("Upload failed:", error)}
    />
  );
}
