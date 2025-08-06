import { useState } from "react";
import { useUsers } from "./hooks/useAdmin";
import { Eye, Mail, Phone, MapPin, Shield, CheckCircle, XCircle, Calendar } from "lucide-react";

export default function UsersManagement() {
  const { data: users, isLoading } = useUsers();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = users?.filter((u: any) => u.role !== "admin");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">👥 Quản lý người dùng</h1>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Full Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user: any, idx: number) => (
              <tr
                key={user.user_id}
                className={`transition-colors duration-200 hover:bg-blue-50 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-6 py-3 text-sm">{user.email}</td>
                <td className="px-6 py-3 text-sm">{user.full_name}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === "job_seeker"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-3 text-center">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative transform transition-all scale-95 hover:scale-100">
            {/* Close button */}
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  selectedUser.full_name?.[0] || "?"
                )}
              </div>
              <h2 className="mt-2 text-xl font-bold">{selectedUser.full_name}</h2>
              <p className="text-sm text-gray-500">{selectedUser.role}</p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-500" /> {selectedUser.email}
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-500" /> {selectedUser.phone || "N/A"}
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-red-500" /> {selectedUser.address || "N/A"}
              </p>
              <p className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-500" /> {selectedUser.role}
              </p>
              <p className="flex items-center">
                {selectedUser.email_verified ? (
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2 text-red-500" />
                )}
                {selectedUser.email_verified ? "Email Verified" : "Not Verified"}
              </p>
              <p className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />{" "}
                {new Date(selectedUser.created_at).toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
