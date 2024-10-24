import api from "./api"; 
import TokenService from "./token.services"

const API_URL = "/api/v1/auth/"; // กำหนด API_URL

const register = async (userName, email, password,address) => {
  return await api.post(`${API_URL}signup`, { userName, email, password, address });
};

const login = async (userName, password) => {
  const response = await api.post(`${API_URL}signin`, { userName, password });
  if (response.data.accessToken) {
    TokenService.setUser(response.data); // เก็บข้อมูลผู้ใช้เมื่อเข้าสู่ระบบสำเร็จ
  }
  return response;
};

const logout = () => {
  TokenService.removeUser(); // ลบข้อมูลผู้ใช้เมื่อออกจากระบบเมื่อทำการLogout
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService; 