# Hệ Thống Quản Lý Quà Tặng (Gift Management System) - Backend

Dự án backend được phát triển bằng framework **NestJS** kết hợp **TypeORM** và cơ sở dữ liệu **PostgreSQL**. Hệ thống cung cấp các chức năng đăng nhập, quản lý hồ sơ người dùng cá nhân, xem danh sách quà tặng (dành cho người dùng thường), và đầy đủ các thao tác CRUD quản lý quà tặng (dành cho quản trị viên).

---

## Tính Năng Chính

### 1. Authentication (Xác thực & Phân quyền)
- **Đăng nhập User thường**: `POST /auth/login` → Nhận JWT Token.
- **Đăng nhập Admin**: `POST /auth/admin/login` → Xác thực vai trò `ADMIN` và trả về JWT Token.
- **Bảo mật**: Sử dụng `JwtAuthGuard` để bảo vệ các API private và `RolesGuard` để hạn chế quyền truy cập các API của Admin.
- **Mã hóa**: Mật khẩu được băm an toàn bằng thư viện `bcrypt`.

### 2. Users Module (Hồ sơ người dùng)
- **Xem hồ sơ**: `GET /users/profile` → Trả về thông tin cá nhân của người dùng đăng nhập hiện tại (tự động ẩn mật khẩu băm).
- **Cập nhật hồ sơ**: `PATCH /users/profile` → Hỗ trợ cập nhật tùy chọn `username`, `email` hoặc `password` (tự động kiểm tra trùng lặp email/username trong DB và băm lại mật khẩu mới).

### 3. Gifts Module (Danh sách quà tặng hệ thống)
- **Danh sách quà**: `GET /gifts` → Hỗ trợ tìm kiếm theo tên quà (`?search=`) và phân trang chuyên nghiệp (`page`, `limit`).
- **Chi tiết quà**: `GET /gifts/:id` → Xem chi tiết quà tặng theo ID.

### 🛠️ 4. Admin Module (Quản lý quà tặng dành cho Admin)
Cung cấp bộ RESTful API CRUD đầy đủ cho đối tượng quà tặng (chỉ cho phép Token của tài khoản có role `ADMIN` truy cập):
- **Tạo mới quà tặng**: `POST /admin/gifts` (Validation chặt chẽ: points >= 0, quantity >= 0).
- **Xem danh sách quản trị**: `GET /admin/gifts` (Xem toàn bộ quà tặng sắp xếp theo thời gian tạo mới nhất).
- **Chi tiết quà**: `GET /admin/gifts/:id`.
- **Cập nhật quà**: `PATCH /admin/gifts/:id` (Cho phép cập nhật từng phần).
- **Xóa quà**: `DELETE /admin/gifts/:id` (Xóa hoàn toàn khỏi hệ thống).

---

## Công Nghệ Sử Dụng

- **Core**: Node.js & TypeScript
- **Framework**: NestJS (v11.x)
- **Database ORM**: TypeORM
- **Database Engine**: PostgreSQL
- **Security**: Passport-JWT, Bcrypt
- **Validation**: Class-Validator, Class-Transformer
- **Documentation**: Swagger API UI

---

## Cấu Hình Môi Trường (.env)

Tạo file `.env` tại thư mục gốc `server/` (đã được cấu hình mặc định):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=postgres

JWT_SECRET=mysecretkey
JWT_EXPIRES_IN=1d

PORT=3000
```

---

##  Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Cài đặt các thư viện phụ thuộc
Di chuyển vào thư mục `server/` và cài đặt package:
```bash
npm install
```

### 2. Chạy Database Migrations (Tạo bảng & Seed dữ liệu mẫu)
Hệ thống sử dụng TypeORM migrations để tự động dựng cấu trúc DB và nạp sẵn dữ liệu test (users & gifts):
```bash
# Chạy migrations để dựng bảng và seed dữ liệu mẫu
npm run migration:run

# Hoàn tác migration gần nhất (nếu cần)
npm run migration:revert
```

### 3. Khởi chạy ứng dụng ở chế độ phát triển (Development)
```bash
npm run start:dev
```
Ứng dụng sẽ chạy tại: **http://localhost:3000**

### 4. Build dự án & Kiểm tra định dạng (Linting)
```bash
# Build dự án sang thư mục dist
npm run build

# Kiểm tra và tự động sửa các lỗi format code theo ESLint + Prettier
npm run lint
```

---

##  Tài Khoản Test (Đã được nạp sẵn qua Migration)

Sau khi chạy lệnh `npm run migration:run`, hai tài khoản sau sẽ tự động được tạo trong DB để tiện cho việc thử nghiệm:

| Quyền hạn | Email đăng nhập | Mật khẩu mặc định | Role |
|-----------|-----------------|-------------------|------|
| **User thường** | `user@example.com` | `password123` | `USER` |
| **Admin** | `admin@example.com` | `password123` | `ADMIN` |

Ngoài ra, **6 quà tặng mẫu** (Voucher Shopee, Grab, thẻ cào Viettel, tài khoản Netflix, tai nghe Bluetooth, bình giữ nhiệt) cũng được tự động seed vào bảng `gifts`.

---

## Hướng Dẫn Thử Nghiệm API với Swagger UI

Để việc kiểm thử API nhanh chóng và dễ dàng nhất, hệ thống đã tích hợp sẵn giao diện tài liệu tương tác **Swagger UI**.

### Các bước thực hiện:

1. **Mở Swagger UI**: Truy cập đường dẫn **[http://localhost:3000/api](http://localhost:3000/api)** trên trình duyệt.
2. **Lấy Token Đăng Nhập**:
   - Tìm tag **`Auth`** và mở route `POST /auth/login` (dành cho user) hoặc `POST /auth/admin/login` (dành cho admin).
   - Nhấp vào **"Try it out"**, nhập thông tin đăng nhập mẫu (xem bảng phía trên) và nhấn **"Execute"**.
   - Sao chép giá trị chuỗi của `access_token` ở kết quả trả về.
3. **Kích hoạt Xác thực (Authorize)**:
   - Cuộn lên góc trên bên phải màn hình Swagger, nhấp vào nút **"Authorize"** khóa màu xanh.
   - Dán chuỗi JWT Token vừa sao chép vào trường nhập liệu (Chú ý: **Không** cần thêm tiền tố `"Bearer "`).
   - Nhấp **"Authorize"** rồi đóng popup lại.
4. **Gọi các API Private**:
   - Giờ đây bạn có thể kiểm thử tất cả các API được bảo vệ bằng JWT như xem profile, đổi thông tin cá nhân, xem danh sách quà hệ thống, hoặc các chức năng quản lý quà admin.

---

## 📝 Danh Sách Endpoints Chi Tiết

| Phân nhóm | Method | Route Đường Dẫn | Bảo mật | Mô tả |
|-----------|:------:|-----------------|:-------:|-------|
| **Auth** | `POST` | `/auth/login` | Công khai | Đăng nhập tài khoản User thường |
| | `POST` | `/auth/admin/login` | Công khai | Đăng nhập tài khoản Admin |
| **Users** | `GET` | `/users/profile` | JWT Token | Xem thông tin chi tiết tài khoản hiện tại |
| | `PATCH` | `/users/profile` | JWT Token | Cập nhật thông tin cá nhân (email, username, password) |
| **Gifts** | `GET` | `/gifts` | JWT Token | Xem danh sách quà hệ thống (Hỗ trợ `page`, `limit`, `search`) |
| | `GET` | `/gifts/:id` | JWT Token | Xem chi tiết quà tặng theo ID |
| **Admin - Gifts** | `POST` | `/admin/gifts` | Role `ADMIN` | Tạo mới một quà tặng |
| | `GET` | `/admin/gifts` | Role `ADMIN` | Liệt kê tất cả quà tặng của hệ thống (sắp xếp mới nhất) |
| | `GET` | `/admin/gifts/:id` | Role `ADMIN` | Xem chi tiết quà tặng (Admin) |
| | `PATCH` | `/admin/gifts/:id` | Role `ADMIN` | Cập nhật thông tin quà tặng (tên, mô tả, điểm số, số lượng) |
| | `DELETE` | `/admin/gifts/:id` | Role `ADMIN` | Xóa quà tặng khỏi hệ thống |

---

## 📁 Cấu Trúc Mã Nguồn Chính

```
server/src/
├── admin/               # Module CRUD quà tặng dành cho Admin
├── auth/                # Module xác thực JWT, Passport strategy & Guards
├── common/              # Decorators và Guards dùng chung (phân quyền Roles)
├── config/              # Cấu hình TypeORM kết nối Database
├── database/            # Quản lýmigrations và seed dữ liệu
└── gifts/               # Module xem quà hệ thống dành cho User thường
└── users/               # Module profile và repository lưu trữ người dùng
```
