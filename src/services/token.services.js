const getLocalAccessToken = () => {
  const user = getUser(); // Assuming getUser retrieves the user object with the token
  return user?.accessToken; 
};

const getUserRole = () => {
  const user = getUser(); // Assuming getUser retrieves the user object with the token
  return user?.roles || []; // Return user roles, or empty array if no roles found
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getLocalAccessToken,
  getUserRole, // เพิ่มฟังก์ชันนี้เพื่อใช้ตรวจสอบบทบาท
  setUser,
  getUser,
  removeUser,
};

export default TokenService;
