import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProvinces, Province } from "@/services/provinces";

interface ProvinceSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ProvinceSelect({
  value,
  onValueChange,
  placeholder,
  disabled,
}: ProvinceSelectProps) {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProvinces = async () => {
      try {
        setLoading(true);
        const data = await fetchProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to load provinces:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProvinces();
  }, []);

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled || loading}
    >
      <SelectTrigger className="bg-white">
        <SelectValue
          placeholder={
            loading
              ? t("common.loading")
              : placeholder || t("jobs.filters.selectLocation")
          }
        />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {provinces.map((province) => (
          <SelectItem
            key={province.code}
            value={province.name}
            className="bg-white hover:bg-gray-50"
          >
            {province.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
