export interface Province {
  name: string;
  code: number;
  division_type: string;
  phone_code: number;
  codename: string;
  districts?: District[];
}

export interface District {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  province_code: number;
  wards?: Ward[];
}

export interface Ward {
  name: string;
  code: number;
  codename: string;
  division_type: string;
  district_code: number;
}

const PROVINCES_API_BASE = "https://provinces.open-api.vn/api/v1";

/**
 * Fetch all provinces in Vietnam
 */
export const fetchProvinces = async (): Promise<Province[]> => {
  try {
    const response = await fetch(`${PROVINCES_API_BASE}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching provinces:", error);
    // Fallback to common provinces if API fails
    return [
      {
        name: "Thành phố Hồ Chí Minh",
        code: 79,
        division_type: "thành phố trung ương",
        phone_code: 28,
        codename: "thanh_pho_ho_chi_minh",
      },
      {
        name: "Thành phố Hà Nội",
        code: 1,
        division_type: "thành phố trung ương",
        phone_code: 24,
        codename: "thanh_pho_ha_noi",
      },
      {
        name: "Thành phố Đà Nẵng",
        code: 48,
        division_type: "thành phố trung ương",
        phone_code: 236,
        codename: "thanh_pho_da_nang",
      },
      {
        name: "Thành phố Cần Thơ",
        code: 92,
        division_type: "thành phố trung ương",
        phone_code: 292,
        codename: "thanh_pho_can_tho",
      },
      {
        name: "Tỉnh Bình Dương",
        code: 74,
        division_type: "tỉnh",
        phone_code: 274,
        codename: "tinh_binh_duong",
      },
      {
        name: "Tỉnh Đồng Nai",
        code: 75,
        division_type: "tỉnh",
        phone_code: 251,
        codename: "tinh_dong_nai",
      },
    ];
  }
};

/**
 * Search provinces by name
 */
export const searchProvinces = async (query: string): Promise<Province[]> => {
  if (!query.trim()) return [];

  try {
    const response = await fetch(
      `${PROVINCES_API_BASE}/p/search/?q=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching provinces:", error);
    return [];
  }
};
