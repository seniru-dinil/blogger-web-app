"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SideBarItemProps {
  label: string;
  path: string;
  icon: LucideIcon;
}

export default function SideBarItem({
  label,
  path,
  icon: Icon,
}: SideBarItemProps) {
  const router = useRouter();
  const pathName = usePathname();
  const isRoot = path === "/";
  const isArticle = isRoot && pathName.startsWith("/article");
  const isActive = isRoot
    ? path === pathName || pathName.startsWith("/article")
    : pathName.startsWith(path);

  console.debug(pathName);
  return (
    <div className="w-full flex">
      <button
        className={cn(
          "py-3.5 text-sm font-[500] hover:bg-slate-300/20 hover:text-slate-700/90 transition-all flex items-center  gap-5 text-slate-500 pl-8 w-full cursor-pointer",
          isActive &&
            "bg-sky-200/20 hover:bg-sky-200/20 text-sky-700 hover:text-sky-700"
        )}
        onClick={() => router.push(path)}
      >
        <Icon size={22} />
        <p>{label}</p>
      </button>
      {isActive === true ? (
        <div className="w-[4px] block bg-sky-600 rounded-l-2xl"></div>
      ) : null}
    </div>
  );
}
