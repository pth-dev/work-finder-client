import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Users,
  Settings,
  FileText,
  Building,
  ChevronRight,
} from "lucide-react";
import { useAppStore } from "../../stores/app-store";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: { key: string; label: string }[];
}

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarCollapsed } = useAppStore();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      key: "/",
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
    },
    {
      key: "/jobs",
      icon: <Building className="h-4 w-4" />,
      label: "Jobs",
      children: [
        {
          key: "/jobs",
          label: "All Jobs",
        },
        {
          key: "/jobs/create",
          label: "Create Job",
        },
        {
          key: "/jobs/applications",
          label: "Applications",
        },
      ],
    },
    {
      key: "/users",
      icon: <Users className="h-4 w-4" />,
      label: "Users",
      children: [
        {
          key: "/users",
          label: "All Users",
        },
        {
          key: "/users/create",
          label: "Create User",
        },
      ],
    },
    {
      key: "/profile",
      icon: <User className="h-4 w-4" />,
      label: "Profile",
    },
    {
      key: "/reports",
      icon: <FileText className="h-4 w-4" />,
      label: "Reports",
    },
    {
      key: "/settings",
      icon: <Settings className="h-4 w-4" />,
      label: "Settings",
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const toggleItem = (key: string) => {
    setOpenItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const isActive = (key: string) => location.pathname === key;
  const hasActiveChild = (item: MenuItem) =>
    item.children?.some((child) => location.pathname === child.key) || false;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen bg-slate-900 text-white transition-all duration-200",
        sidebarCollapsed ? "w-20" : "w-50"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-slate-800 mx-4">
        <div className="font-bold text-white">
          {sidebarCollapsed ? "WF" : "Work Finder"}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.key}>
            {item.children ? (
              <Collapsible
                open={openItems.includes(item.key) || hasActiveChild(item)}
                onOpenChange={() => toggleItem(item.key)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-white hover:bg-slate-800",
                      hasActiveChild(item) && "bg-slate-800"
                    )}
                  >
                    {item.icon}
                    {!sidebarCollapsed && (
                      <>
                        <span className="ml-2">{item.label}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
                {!sidebarCollapsed && (
                  <CollapsibleContent className="space-y-1 mt-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.key}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-white hover:bg-slate-800 ml-6",
                          isActive(child.key) && "bg-slate-700"
                        )}
                        onClick={() => handleMenuClick(child.key)}
                      >
                        {child.label}
                      </Button>
                    ))}
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-slate-800",
                  isActive(item.key) && "bg-slate-700"
                )}
                onClick={() => handleMenuClick(item.key)}
              >
                {item.icon}
                {!sidebarCollapsed && (
                  <span className="ml-2">{item.label}</span>
                )}
              </Button>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
