export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
  LOGIN_SUCCESS: 'Đăng nhập thành công',
  ADMIN_LOGIN_SUCCESS: 'Admin đăng nhập thành công',
  NOT_ADMIN: 'Bạn không có quyền Admin',
};

export const GIFT_MESSAGES = {
  NOT_FOUND: 'Không tìm thấy quà tặng hợp lệ',
  NOT_FOUND_BY_ID: (id: number) => `Không tìm thấy quà tặng với ID ${id}`,
  CREATE_SUCCESS: 'Tạo quà tặng thành công',
  GET_LIST_SUCCESS: 'Lấy danh sách quà tặng thành công',
  GET_ONE_SUCCESS: 'Lấy thông tin quà tặng thành công',
  GET_ONE_DETAIL_SUCCESS: 'Lấy thông tin chi tiết quà tặng thành công',
  UPDATE_SUCCESS: 'Cập nhật quà tặng thành công',
  DELETE_SUCCESS: 'Xóa quà tặng thành công',
};

export const USER_MESSAGES = {
  NOT_FOUND: 'Không tìm thấy người dùng',
  USERNAME_EXISTS: 'Tên đăng nhập đã tồn tại',
  EMAIL_EXISTS: 'Email đã tồn tại',
  GET_PROFILE_SUCCESS: 'Lấy thông tin người dùng thành công',
  UPDATE_PROFILE_SUCCESS: 'Cập nhật thông tin cá nhân thành công',
};