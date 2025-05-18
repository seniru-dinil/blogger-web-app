"use client ";

import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      {/* <div className="md:flex hidden h-full w-75  ">
        <Sidebar />
      </div> */}

      <SidebarProvider>
        <AppSidebar />
        <div className="w-full h-full  flex flex-col">
          <div>
            <Navbar />
          </div>
          <div className="h-full overflow-y-auto">{children}</div>
        </div>
      </SidebarProvider>
    </div>
  );
}
