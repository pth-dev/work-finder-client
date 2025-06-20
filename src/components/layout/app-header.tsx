import React from "react";
import { Menu, Bell, User, LogOut, Settings, Search } from "lucide-react";
import { useAuthStore } from "../../stores/auth-store";
import { useAppStore } from "../../stores/app-store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const AppHeader: React.FC = () => {
  const { user, logout } = useAuthStore();
  const {
    sidebarCollapsed,
    toggleSidebar,
    notifications,
    globalSearch,
    setGlobalSearch,
  } = useAppStore();

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  const handleSettingsClick = () => {
    window.location.href = "/settings";
  };

  return (
    <header className="px-6 bg-card border-b border-border flex items-center justify-between h-16">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-10 w-10"
        >
          {sidebarCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <Menu className="h-4 w-4" />
          )}
        </Button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-80 pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start p-4"
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {notification.message}
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No new notifications</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-10">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{user?.name || "User"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
