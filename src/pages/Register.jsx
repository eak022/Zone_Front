import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate(); // เรียกใช้ useNavigate
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    address: "", // เพิ่มที่อยู่นี้
    roles: ["user"], // กำหนดบทบาทเริ่มต้น
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!user.userName) newErrors.userName = "userName is required"; 
    if (!user.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email is invalid";
    if (!user.password) newErrors.password = "Password is required";
    if (!user.address) newErrors.address = "Address is required"; // เพิ่มการตรวจสอบที่อยู่
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
        // ถ้ามีข้อผิดพลาดในการตรวจสอบข้อมูล จะไม่ทำงานต่อ
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    // ตั้งค่า errors และ loading เป็นค่าเริ่มต้น
    setErrors({});
    setLoading(true);

    // ใช้ navigate เพื่อเปลี่ยนเส้นทางหลังจากลงทะเบียนสำเร็จ
    // อัปเดตข้อมูลผู้ใช้เพื่อรวมบทบาทที่ถูกต้อง
    const userData = {
        ...user,
        roles: ['user'], // กำหนดบทบาทที่เหมาะสมที่นี่
    };

    try {
        console.log("User data being sent:", userData);
        const response = await axios.post(
            "http://localhost:5000/api/v1/auth/signup",
            userData
        );
        Swal.fire("Registration successful", response.data.message, "success");
        setUser({
          userName: "",
          email: "",
          password: "",
          address: "", // รีเซ็ตที่อยู่เมื่อสำเร็จ
          roles: [''], // รีเซ็ตบทบาทเมื่อสำเร็จ
        });

         // เปลี่ยนเส้นทางไปยังหน้า Login หลังจากลงทะเบียนสำเร็จ
         navigate("/login");

    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred";
        console.error("Registration error:", errorMessage);
        Swal.fire("Registration error", errorMessage, "error");
    } finally {
        setLoading(false);
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
        className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-2xl"
        style={{ backgroundColor: "#008163" }}
      >
        <h2 className="text-3xl font-bold text-center" style={{ color: "#E9EFEC" }}>
        Create Account
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
              type="userName"
              id="userName"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#5F6F65",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: "#E9EFEC" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#5F6F65",
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.email}
              </p>
            )}
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
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#5F6F65",
              }}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium"
              style={{ color: "#E9EFEC" }}
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              style={{
                borderColor: "#E9EFEC",
                backgroundColor: "#E9EFEC",
                color: "#5F6F65",
              }}
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="mt-2 text-sm" style={{ color: "#FF0000" }}>
                {errors.address}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm"
              style={{
                backgroundColor: "#EE2526",
                color: "#E9EFEC",
              }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={handleCancel}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md shadow-sm "
              style={{
                backgroundColor: "#EE2526",
                color: "#E9EFEC"
              }}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
