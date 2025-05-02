import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-[350px] bg-gray-50 p-6 rounded-2xl">{children}</div>
    </div>
  );
}
