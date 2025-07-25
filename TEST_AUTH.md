# Test Authentication System

## ✅ Đã hoàn thành

### 1. Cấu hình

- ✅ API URL: `http://localhost:3001/api/v1` (trong .env.local)
- ✅ Frontend: `http://localhost:3000`

### 2. Form đăng ký (Register)

- ✅ Sử dụng **react-hook-form + zod validation**
- ✅ Schema validation từ `src/lib/validations/auth.ts`
- ✅ Fields: fullName, username, email, phone, password, confirmPassword, role, agreeToTerms
- ✅ Role mapping: recruiter → employer (cho API)
- ✅ Proper error handling và validation messages
- ✅ **i18n placeholders** cho tất cả fields
- ✅ **Fixed phone validation** hỗ trợ số VN (0867713501)
- ✅ **Fixed login form** sử dụng username thay vì email
- ✅ **Optimized registration** email và fullName giờ là optional

### 3. Form đăng nhập (Login)

- ✅ **Đã refactor** sử dụng **react-hook-form + zod**
- ✅ Schema validation từ `src/lib/validations/auth.ts`
- ✅ Fields: email, password, rememberMe
- ✅ Proper error handling và validation messages
- ✅ Zustand store integration
- ✅ **i18n placeholders** cho tất cả fields
- ✅ **Fixed UI height** với inputClassName

### 4. State Management

- ✅ Zustand với persist middleware
- ✅ HttpOnly cookie authentication
- ✅ Toast notifications

### 5. Route Protection

- ✅ Middleware bảo vệ dashboard routes
- ✅ Auto redirect logic

## 🧪 Cách test

### Test đăng ký:

1. Truy cập: http://localhost:3000/register
2. Điền form với thông tin hợp lệ (phone: 0867713501)
3. Chọn role (Ứng viên/Nhà tuyển dụng)
4. Check "Đồng ý điều khoản"
5. Click "Đăng ký"
6. Kiểm tra redirect về dashboard

### Test đăng nhập:

1. Truy cập: http://localhost:3000/login
2. Nhập email/password đã đăng ký
3. Click "Đăng nhập"
4. Kiểm tra redirect về dashboard

### Test route protection:

1. Truy cập: http://localhost:3000/dashboard (khi chưa login)
2. Kiểm tra redirect về login page
3. Login thành công → redirect về dashboard

## 🔧 Troubleshooting

### Nếu gặp lỗi API:

- Kiểm tra backend đang chạy ở port 3001
- Kiểm tra CORS settings trong backend
- Kiểm tra API endpoints: `/auth/login`, `/auth/register`

### Nếu validation không hoạt động:

- Kiểm tra zod schema trong `src/lib/validations/auth.ts`
- Kiểm tra form field mapping

### Nếu authentication state không persist:

- Kiểm tra HttpOnly cookies trong browser DevTools
- Kiểm tra Zustand persist middleware
