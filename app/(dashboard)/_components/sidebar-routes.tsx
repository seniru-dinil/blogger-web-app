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
import { useAuth } from "@/context/authContext";

const publisherRoutes = [
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
  const { role } = useAuth();
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
