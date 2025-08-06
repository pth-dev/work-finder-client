import { useState } from "react";
import { useCompanies } from "./hooks/useAdmin";
import { deleteCompany } from "./api/admin";
import { Eye, Trash2, MapPin, Building2, Globe, Users, CheckCircle, XCircle } from "lucide-react";

export default function CompaniesManagement() {
  const { data: companies, isLoading, refetch } = useCompanies();
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; companyId: number | null }>({ open: false, companyId: null });
  const [resultModal, setResultModal] = useState<{ open: boolean; success: boolean; message: string }>({ open: false, message: "", success: false });

  const handleDelete = async (id: number) => {
    try {
      setDeleting(id);
      await deleteCompany(id);
      await refetch();
      setResultModal({ open: true, success: true, message: "Xóa công ty thành công!" });
    } catch (error) {
      console.error(error);
      setResultModal({ open: true, success: false, message: "Xóa công ty thất bại!" });
    } finally {
      setDeleting(null);
      setDeleteModal({ open: false, companyId: null });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">🏢 Quản lý công ty</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies?.map((company: any) => (
          <div
            key={company.company_id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
          >
            <div>
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold mb-3">
                {company.company_image ? (
                  <img
                    src={company.company_image}
                    alt={company.company_name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  company.company_name?.[0] || "?"
                )}
              </div>

              <h2 className="text-lg font-semibold">{company.company_name}</h2>
              <p className="text-sm text-gray-500 line-clamp-2">{company.description}</p>

              <div className="mt-3 space-y-1 text-sm">
                <p className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" /> {company.location}
                </p>
                <p className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2 text-purple-500" /> {company.industry}
                </p>
                <p className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2 text-green-500" />
                  <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {company.website}
                  </a>
                </p>
                <p className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-orange-500" /> {company.company_size}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center border-t pt-3">
              <button
                onClick={() => setSelectedCompany(company)}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                <Eye className="w-4 h-4" /> Xem
              </button>
              <button
                onClick={() => setDeleteModal({ open: true, companyId: company.company_id })}
                disabled={deleting === company.company_id}
                className="flex items-center gap-1 text-red-600 hover:underline disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" /> {deleting === company.company_id ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setSelectedCompany(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedCompany.company_name}</h2>
            <p className="mb-3">{selectedCompany.description}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Ngành:</strong> {selectedCompany.industry}</p>
              <p><strong>Website:</strong> {selectedCompany.website}</p>
              <p><strong>Địa chỉ:</strong> {selectedCompany.address}</p>
              <p><strong>Vị trí:</strong> {selectedCompany.location}</p>
              <p><strong>Quy mô:</strong> {selectedCompany.company_size}</p>
              <p><strong>Số lượng công việc:</strong> {selectedCompany.job_count}</p>
            </div>
          </div>
        </div>
      )}

      {deleteModal.open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Xác nhận xóa</h2>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa công ty này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModal({ open: false, companyId: null })}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteModal.companyId!)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {resultModal.open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-2 mb-4">
              {resultModal.success ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <h2 className="text-xl font-bold text-gray-800">
                {resultModal.success ? "Thành công" : "Thất bại"}
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{resultModal.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setResultModal({ open: false, success: false, message: "" })}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}