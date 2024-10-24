import { useState } from "react";
import AuthService from "../services/auth.services";
import { useAuthContext } from "../contexts/StoreContext"; // ใช้ useCourse แทน
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const { login } = useAuthContext(); // เรียกใช้ login จาก CourseContext
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to log in with:", user);
      const response = await AuthService.login(user.userName, user.password);
      console.log(response); // แสดงค่าผลลัพธ์จากการเข้าสู่ระบบ
      if (response.status === 200) {
        const currentUser = response.data; // ค่าที่ต้องการตรวจสอบ
        login(currentUser);
        console.log("Current User:", currentUser); // ตรวจสอบค่า
        Swal.fire({
          icon: "success",
          title: "Login successful!",
          text: "You will be redirected to the homepage.",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/"); // เปลี่ยนเส้นทางไปที่หน้า Home
        });
        setUser({
          userName: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ.";
      Swal.fire({
        icon: "error",
        title: "Login failed!",
        text: errorMessage,
        timer: 3000,
        showConfirmButton: true,
      });
    }
  };

  const handleCancel = () => {
    navigate("/"); // เปลี่ยนเส้นทางไปที่หน้า Home
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#F7F7F8" }}
    >
      <div
        className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-2xl mx-auto"
        style={{ backgroundColor: "#008163" }}
      >
        <h2
          className="text-3xl font-bold text-center"
          style={{ color: "#E9EFEC" }}
        >
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium"
              style={{ color: "#E9EFEC" }}
            >
              userName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#1E2A5E",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium"
              style={{ color: "#E9EFEC" }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#1E2A5E",
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm "
              style={{
                backgroundColor: "#EE2526",
                color: "#E9EFEC",
              }}
            >
              Login
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm "
              style={{
                backgroundColor: "#EE2526",
                color: "#E9EFEC",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
