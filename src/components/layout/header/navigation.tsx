"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationProps, NavigationItem } from "@/types/navigation";

interface NavItemProps {
  item: NavigationItem;
  isScrolled: boolean;
  isMobile?: boolean;
}

const NavItem = ({ item, isScrolled, isMobile = false }: NavItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);

  const baseTextClass = isMobile
    ? "text-gray-900"
    : isScrolled
    ? "text-gray-700"
    : "text-white";

  const activeTextClass = "text-blue-600";
  const hoverTextClass = "hover:text-blue-600";

  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "flex items-center space-x-1 font-medium transition-colors focus:outline-none",
              isActive ? activeTextClass : baseTextClass,
              hoverTextClass,
              isMobile && "w-full justify-start"
            )}
          >
            {isMobile && item.icon && <item.icon className="w-4 h-4" />}
            <span>{item.label}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isMobile ? "start" : "start"}
          className="w-64 mt-2"
          sideOffset={isMobile ? 0 : 8}
        >
          {item.children.map((child) => {
            const isChildActive = pathname === child.href;
            return (
              <DropdownMenuItem key={child.href} asChild>
                <Link
                  href={child.href}
                  className={cn(
                    "flex flex-col items-start space-y-1 p-3",
                    isChildActive && "bg-blue-50 text-blue-600"
                  )}
                >
                  <span className="font-medium">{child.label}</span>
                  {child.description && (
                    <span className="text-sm text-gray-500">
                      {child.description}
                    </span>
                  )}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center space-x-2 font-medium transition-colors",
        isActive ? activeTextClass : baseTextClass,
        hoverTextClass,
        isMobile && "w-full py-2"
      )}
    >
      {isMobile && item.icon && <item.icon className="w-4 h-4" />}
      <span>{item.label}</span>
    </Link>
  );
};

const Navigation = ({
  items,
  isScrolled = false,
  isMobile = false,
}: NavigationProps) => {
  if (isMobile) {
    return (
      <nav className="space-y-2">
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isScrolled={true}
            isMobile={true}
          />
        ))}
      </nav>
    );
  }

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {items.map((item) => (
        <NavItem key={item.id} item={item} isScrolled={isScrolled} />
      ))}
    </nav>
  );
};

export default Navigation;
