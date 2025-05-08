"use client ";

import { AuthProvider } from "@/context/authContext";
import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex h-full">
        <div className="md:flex hidden h-full w-75  ">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <Navbar />
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
