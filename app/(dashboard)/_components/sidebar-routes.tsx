"use client";
import { Compass, Info, Newspaper, UserRoundPen } from "lucide-react";
import SideBarItem from "./sidebar-item";

const routes = [
  {
    label: "Browse",
    path: "/",
    icon: Compass,
  },
  {
    label: "Profile",
    path: "/user/1",
    icon: UserRoundPen,
  },

  {
    label: "Library",
    path: "/articles",
    icon: Newspaper,
  },
  {
    label: "Help",
    path: "/help",
    icon: Info,
  },
];

export default function SideBarRoutes() {
  return (
    <div className="grid  w-full h-fit">
      {routes.map((route) => (
        <SideBarItem
          icon={route.icon}
          label={route.label}
          path={route.path}
          key={route.label}
        />
      ))}
    </div>
  );
}
