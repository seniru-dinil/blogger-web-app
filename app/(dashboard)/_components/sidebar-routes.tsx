"use client";
import {
  ChartLine,
  Compass,
  Info,
  List,
  Newspaper,
  UserRoundPen,
} from "lucide-react";
import SideBarItem from "./sidebar-item";
import { Role } from "@/context/authContext";

const publisherRoutes = [
  {
    label: "Browse",
    path: "/",
    icon: Compass,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: UserRoundPen,
  },

  {
    label: "Library",
    path: "/library",
    icon: Newspaper,
  },
  {
    label: "Help",
    path: "/help",
    icon: Info,
  },
  {
    label: "Articles",
    path: "/publisher/articles",
    icon: List,
  },
  {
    label: "Stats",
    path: "/publisher/stats",
    icon: ChartLine,
  },
];

const userRoutes = [
  {
    label: "Browse",
    path: "/",
    icon: Compass,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: UserRoundPen,
  },
  {
    label: "Library",
    path: "/library",
    icon: Newspaper,
  },
  {
    label: "Help",
    path: "/help",
    icon: Info,
  },
];

export default function SideBarRoutes() {
  const role: Role[] = JSON.parse(localStorage.getItem("role") || "[]");
  const routes = role.includes("ROLE_PUBLISHER") ? publisherRoutes : userRoutes;
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
