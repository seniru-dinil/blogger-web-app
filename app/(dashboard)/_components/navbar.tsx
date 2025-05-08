"use client";

import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <div className="border-b-1 h-[70px] border-b-slate-50 flex items-center px-6">
      <MobileSidebar />
    </div>
  );
}
