import { AuthProvider } from "@/context/authContext";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
