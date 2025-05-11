import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="" title="mobile side bar">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
