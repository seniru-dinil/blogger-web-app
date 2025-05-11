import Image from "next/image";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen gap-10">
      {children}
    </div>
  );
}
