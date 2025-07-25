"use client";

import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/hooks/useTranslation";
import { LANGUAGE_INFO, type SupportedLocale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "ghost" | "outline" | "primary" | "secondary";
  size?: "sm" | "default" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function LanguageSwitcher({
  variant = "ghost",
  size = "default",
  showLabel = false,
  className,
}: LanguageSwitcherProps) {
  const { locale, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGE_INFO[locale];

  const handleLanguageChange = (newLocale: SupportedLocale) => {
    if (newLocale !== locale) {
      changeLanguage(newLocale);
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "flex items-center gap-2 font-medium",
            size === "sm" && "h-8 px-2",
            className
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            <span className="text-lg leading-none">{currentLanguage.flag}</span>
            {showLabel && (
              <span className="hidden sm:inline">
                {currentLanguage.nativeName}
              </span>
            )}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.values(LANGUAGE_INFO).map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">
                  {language.name}
                </span>
              </div>
            </div>
            {language.code === locale && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Compact version for mobile/small spaces
export function CompactLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="ghost"
      size="sm"
      showLabel={false}
      className={cn("h-10 w-10 p-0 min-w-[40px] min-h-[40px]", className)}
    />
  );
}

// Full version with label for desktop
export function FullLanguageSwitcher({ className }: { className?: string }) {
  return (
    <LanguageSwitcher
      variant="outline"
      size="default"
      showLabel={true}
      className={className}
    />
  );
}
