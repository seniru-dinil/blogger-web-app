import Image from "next/image";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen gap-10">
      <Image src={"/bg-1.png"} alt="image" width={450} height={600} />
      {children}
    </div>
  );
}
