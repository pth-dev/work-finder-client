"use client";

import { forwardRef, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Common Vietnam locations
const POPULAR_LOCATIONS = [
  "Hồ Chí Minh",
  "Hà Nội", 
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Nha Trang",
  "Huế",
  "Vũng Tàu",
];

interface LocationFieldProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export const LocationField = forwardRef<HTMLInputElement, LocationFieldProps>(
  ({ 
    label,
    value = "", 
    onChange, 
    placeholder = "Chọn địa điểm...", 
    className,
    disabled = false,
    required = false,
    error
  }, ref) => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
    };

    const handleLocationSelect = (location: string) => {
      setInputValue(location);
      onChange?.(location);
      setOpen(false);
    };

    const filteredLocations = POPULAR_LOCATIONS.filter(location =>
      location.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              
              <Input
                ref={ref}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabled}
                className={cn(
                  "pl-10 pr-10 h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500",
                  error && "border-red-500 focus:border-red-500"
                )}
                onFocus={() => setOpen(true)}
              />
              
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </PopoverTrigger>
          
          <PopoverContent className="w-full p-0" align="start">
            <div className="max-h-60 overflow-auto">
              {filteredLocations.length > 0 ? (
                <div className="p-1">
                  {filteredLocations.map((location) => (
                    <Button
                      key={location}
                      variant="ghost"
                      className="w-full justify-start h-9 px-3 text-sm"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      {location}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-sm text-gray-500 text-center">
                  Không tìm thấy địa điểm
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

LocationField.displayName = "LocationField";
